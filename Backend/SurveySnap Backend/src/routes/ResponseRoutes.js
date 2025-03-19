const routes = require("express").Router();
const responseController = require("../controllers/ResponseController");

routes.post("/submit", responseController.submitResponse);
routes.get("/survey/:surveyId", responseController.getResponsesBySurvey); // Ensure surveyId matches controller

module.exports = routes;
