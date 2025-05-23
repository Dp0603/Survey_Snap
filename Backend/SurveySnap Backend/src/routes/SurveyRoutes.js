const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/SurveyController");

router.post("/add", surveyController.createSurvey);
router.get("/all", surveyController.getAllSurveys);
router.get("/:id", surveyController.getSurveyById);
router.put("/:id", surveyController.updateSurvey);
router.delete("/:id", surveyController.deleteSurvey);
router.get("/user/:userId", surveyController.getUserSurveys);

router.get("/active", surveyController.getActiveSurveys);

module.exports = router;
