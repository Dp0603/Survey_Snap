// const routes = require("express").Router();
// const questionController = require("../controllers/QuestionController");

// routes.post("/add", questionController.addQuestion);
// routes.get("/survey/:surveyId", questionController.getQuestionsBySurvey); // Ensure this matches the controller

// module.exports = routes;


const routes = require("express").Router();
const questionController = require("../controllers/QuestionController");

routes.post("/add", questionController.addQuestionWithFile);
routes.get("/survey/:surveyId", questionController.getQuestionsBySurvey);

module.exports = routes;
