const express = require("express");
const routes = express.Router();
const responseController = require("../controllers/ResponseController");

// Submit survey response
routes.post("/submit", responseController.submitResponse);

// Respondent stats
routes.get("/stats/:userId", responseController.getRespondentSurveyStats);
routes.get("/survey/:surveyId", responseController.getResponsesBySurveyId);


module.exports = routes;
