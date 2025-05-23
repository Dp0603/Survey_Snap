const express = require("express");
const routes = express.Router();
const responseController = require("../controllers/ResponseController");

routes.post("/submit", responseController.submitResponse);
routes.get("/stats/:userId", responseController.getRespondentSurveyStats);
routes.get("/survey/:surveyId", responseController.getResponsesBySurveyId);
routes.get("/view/:responseId", responseController.getResponseById);
routes.get("/available/:userId", responseController.getAvailableSurveys);
routes.get("/completed/:userId", responseController.getCompletedSurveys);
routes.get("/pending/:userId", responseController.getPendingSurveys);

module.exports = routes;
