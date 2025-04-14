const routes = require("express").Router();
const surveydistributionController = require("../controllers/SurveyDistributionController");

routes.post("/send", surveydistributionController.distributeSurvey);
routes.get("/all", surveydistributionController.getAllDistributions);

module.exports = routes;
