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
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CSVLink } from "react-csv";
import axios from "axios";
import "./ManageReport.css";

const ManageReport = () => {
  const reportRef = useRef();
  const [reportData, setReportData] = useState({
    users: 0,
    userRoles: {},
    surveys: 0,
    questions: 0,
    responses: 0,
    analytics: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFullReport();
  }, []);

  const fetchFullReport = async () => {
    try {
      const res = await axios.get("/adminreport/full-report");
      setReportData(res.data.data || {});
    } catch (err) {
      console.error("Error fetching full report", err);
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
      pdf.save("admin-report.pdf");
    });
  };

  const {
    users,
    userRoles = {},
    surveys,
    questions,
    responses,
    analytics = [],
  } = reportData;

  const totalResponses = analytics.reduce(
    (sum, a) => sum + (a.total_responses || 0),
    0
  );

  const userRolePieData = {
    labels: Object.keys(userRoles),
    datasets: [
      {
        data: Object.values(userRoles),
        backgroundColor: ["#d32f2f", "#1976d2", "#388e3c"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Box className="report-container" ref={reportRef}>
      <Typography variant="h4" className="report-heading">
        📊 Admin Dashboard Report
      </Typography>

      {loading ? (
        <Box className="report-loading">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={2} className="report-summary">
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper className="report-card">
                <Typography variant="subtitle2">👤 Users</Typography>
                <Typography variant="h5">{users}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper className="report-card">
                <Typography variant="subtitle2">📋 Surveys</Typography>
                <Typography variant="h5">{surveys}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper className="report-card">
                <Typography variant="subtitle2">❓ Questions</Typography>
                <Typography variant="h5">{questions}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper className="report-card">
                <Typography variant="subtitle2">✅ Responses</Typography>
                <Typography variant="h5">{responses}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <Paper className="report-card">
                <Typography variant="subtitle2">📦 Data Points</Typography>
                <Typography variant="h5">{totalResponses}</Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box className="report-chart-grid">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  👥 User Role Distribution
                </Typography>
                <Paper className="chart-card">
                  <Pie data={userRolePieData} />
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Box className="report-table">
            <Typography variant="h6" gutterBottom>
              📃 Full Report Table
            </Typography>
            <Paper>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Survey</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Total Responses</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Raw Data</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Date</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analytics.map((a) => (
                    <TableRow key={a._id}>
                      <TableCell>{a.survey_id?.title || "Untitled"}</TableCell>
                      <TableCell>{a.total_responses}</TableCell>
                      <TableCell>
                        {JSON.stringify(a.response_data).slice(0, 60)}...
                      </TableCell>
                      <TableCell>
                        {new Date(a.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>

          <Box className="report-export" mt={4} textAlign="right">
            <CSVLink
              data={analytics}
              filename="admin_full_report.csv"
              className="csv-link"
            >
              <Button variant="outlined" color="success" sx={{ mr: 2 }}>
                📄 Export CSV
              </Button>
            </CSVLink>
            <Button variant="contained" color="secondary" onClick={exportPDF}>
              📥 Export PDF
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ManageReport;
