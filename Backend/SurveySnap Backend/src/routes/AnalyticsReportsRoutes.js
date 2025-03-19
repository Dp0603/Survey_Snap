const routes = require("express").Router();
const analyticsController = require("../controllers/AnalyticsReportsController");

routes.get("/survey/:surveyId", analyticsController.getSurveyAnalytics); // Ensure function name matches the controller
routes.post("/addreports",analyticsController.generateReport)
module.exports = routes;
