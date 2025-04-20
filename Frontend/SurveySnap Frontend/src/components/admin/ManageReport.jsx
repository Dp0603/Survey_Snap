import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import "./ManageReport.css";

const ManageReport = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const reportRef = useRef();

  useEffect(() => {
    fetchReports();
    const interval = setInterval(fetchReports, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/analytics/survey-analytics"
      );
      setReports(res.data.data);
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("analytics-report.pdf");
    });
  };

  const totalResponses = reports.reduce(
    (sum, r) => sum + (r.total_responses || 0),
    0
  );
  const latestDate = reports.length
    ? new Date(
        Math.max(...reports.map((r) => new Date(r.createdAt)))
      ).toLocaleDateString()
    : "N/A";

  const chartData = {
    labels: reports.map((r) => r.survey_id?.title || "Response"),
    datasets: [
      {
        label: "Responses",
        data: reports.map((r) => r.total_responses || 0),
        backgroundColor: "rgba(63, 81, 181, 0.7)",
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Responses: ${context.parsed.y}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <Box className="analytics-container" ref={reportRef} sx={{ px: 2, py: 3 }}>
      <Typography variant="h4" gutterBottom>
        📈 Survey Analytics Dashboard
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3} className="summary-grid">
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} className="summary-box">
                <Typography variant="subtitle1" color="textSecondary">
                  🧮 Total Responses
                </Typography>
                <Typography variant="h5" color="primary">
                  {totalResponses}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} className="summary-box">
                <Typography variant="subtitle1" color="textSecondary">
                  📋 Unique Surveys
                </Typography>
                <Typography variant="h5" color="primary">
                  {reports.length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} className="summary-box">
                <Typography variant="subtitle1" color="textSecondary">
                  🕒 Latest Report
                </Typography>
                <Typography variant="h5" color="primary">
                  {latestDate}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box mt={6}>
            <Typography variant="h6" gutterBottom>
              📊 Responses per Survey
            </Typography>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Bar data={chartData} options={chartOptions} />
            </Paper>
          </Box>

          <Box mt={6}>
            <Typography variant="h6" gutterBottom>
              📃 Analytics Reports (Raw Data)
            </Typography>
            <Paper elevation={2}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Survey</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Responses</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Response Data</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((r) => (
                    <TableRow key={r._id}>
                      <TableCell>{r.survey_id?.title || "Response"}</TableCell>
                      <TableCell>{r.total_responses}</TableCell>
                      <TableCell>
                        {r.response_data.length > 60
                          ? r.response_data.slice(0, 60) + "..."
                          : r.response_data}
                      </TableCell>
                      <TableCell>
                        {new Date(r.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>

          <Box textAlign="right" mt={4}>
            <Button variant="contained" onClick={exportPDF} color="secondary">
              📥 Export Full Report
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ManageReport;
