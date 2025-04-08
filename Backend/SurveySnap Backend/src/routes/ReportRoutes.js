const routes = require("express").Router();
const reportController = require("../controllers/ReportController");

// Platform-wide stats for admin
routes.get("/platform-overview", reportController.getPlatformOverview);
routes.get("/top-surveys", reportController.getTopSurveys);
routes.get("/user-summary", reportController.getUserSummary);

module.exports = routes;
