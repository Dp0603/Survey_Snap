const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/AnalyticsReportsController");

router.get("/survey-analytics", analyticsController.getSurveyAnalytics);
router.post("/generate-report", analyticsController.generateReport);

router.get("/recent-activity", analyticsController.getRecentActivity);

module.exports = router;
