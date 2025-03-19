const AnalyticsModel = require("../models/AnalyticsReportsModel");

const generateReport = async (req, res) => {
  try {
    const savedReport = await AnalyticsModel.create(req.body);
    res.status(201).json({
      message: "Report generated successfully",
      data: savedReport,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSurveyAnalytics = async (req, res) => { 
  try {
    const reports = await AnalyticsModel.find().populate("survey_id")
    res.status(200).json({
      message: "Reports retrieved successfully",
      data: reports,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { generateReport, getSurveyAnalytics }; 
