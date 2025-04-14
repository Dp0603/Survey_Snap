const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/AnalyticsReportsController");

// Routes for Analytics
router.get("/survey-analytics", analyticsController.getSurveyAnalytics);
router.post("/generate-report", analyticsController.generateReport);

module.exports = router;
