const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/AnalyticsReportsController");

router.get("/survey-analytics", analyticsController.getSurveyAnalytics);
router.post("/generate-report", analyticsController.generateReport);

// 🆕 Add this route
router.get("/recent-activity", analyticsController.getRecentActivity);

module.exports = router;
