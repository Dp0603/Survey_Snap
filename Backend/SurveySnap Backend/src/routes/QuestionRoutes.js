const routes = require("express").Router();
const questionController = require("../controllers/QuestionController");

routes.post("/add", questionController.addQuestionWithFile);
routes.get("/survey/:surveyId", questionController.getQuestionsBySurvey);
routes.put("/:id", questionController.updateQuestion);
routes.delete("/:id", questionController.deleteQuestion);

module.exports = routes;
