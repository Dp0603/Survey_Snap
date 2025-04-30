const express = require("express");
const router = express.Router();
const surveyController = require("../controllers/SurveyController"); // ✅ Ensure this path is correct

// Existing routes for CRUD operations
router.post("/add", surveyController.createSurvey);
router.get("/all", surveyController.getAllSurveys);
router.get("/:id", surveyController.getSurveyById);
router.put("/:id", surveyController.updateSurvey);
router.delete("/:id", surveyController.deleteSurvey);
router.get("/user/:userId", surveyController.getUserSurveys);

// New route for active surveys
router.get("/active", surveyController.getActiveSurveys); // ✅ New active survey route

module.exports = router;
