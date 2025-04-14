const AnalyticsModel = require("../models/AnalyticsReportsModel");

// Generate or update report for a specific survey
const generateReport = async (req, res) => {
  try {
    const { survey_id, total_responses, response_data } = req.body;

    if (!survey_id || !response_data) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if report already exists for the survey
    const existingReport = await AnalyticsModel.findOne({ survey_id });

    let report;
    if (existingReport) {
      existingReport.total_responses =
        total_responses || existingReport.total_responses;
      existingReport.response_data = response_data;
      report = await existingReport.save();
    } else {
      report = await AnalyticsModel.create({
        survey_id,
        total_responses,
        response_data,
      });
    }

    res.status(201).json({
      message: "Report saved successfully",
      data: report,
    });
  } catch (err) {
    console.error("Error generating report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all analytics reports
const getSurveyAnalytics = async (req, res) => {
  try {
    const reports = await AnalyticsModel.find().populate(
      "survey_id",
      "title createdAt"
    );
    res.status(200).json({
      message: "Reports retrieved successfully",
      data: reports,
    });
  } catch (err) {
    console.error("Error retrieving reports:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  generateReport,
  getSurveyAnalytics,
};
