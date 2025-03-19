const routes = require("express").Router();
const surveyController = require("../controllers/SurveyController");

routes.post("/add", surveyController.createSurvey);
routes.get("/all", surveyController.getAllSurveys);

module.exports = routes;
