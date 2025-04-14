const routes = require("express").Router();
const shareController = require("../controllers/ShareController");

routes.post("/share/survey", shareController.shareSurvey);

module.exports = routes;
