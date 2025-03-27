const ResponseModel = require("../models/ResponseModel");
const UserModel = require("../models/UserModel"); // ✅ Ensure UserModel is imported
const QuestionModel = require("../models/QuestionModel"); // ✅ Ensure QuestionModel is imported

// ✅ Submit Response
const submitResponse = async (req, res) => {
  try {
    const { survey_id, question_id, respondent_id, response } = req.body;

    // ✅ Ensure all fields exist
    if (!survey_id || !question_id || !respondent_id || !response) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // ✅ Validate if User, Survey, and Question exist before saving
    const userExists = await UserModel.findById(respondent_id);
    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    const questionExists = await QuestionModel.findById(question_id);
    if (!questionExists) {
      return res.status(404).json({ message: "Question not found." });
    }

    // ✅ Save Response
    const savedResponse = await ResponseModel.create(req.body);
    res.status(201).json({
      message: "Response submitted successfully",
      data: savedResponse,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getResponsesBySurvey = async (req, res) => {
  try {
    const { surveyId } = req.params;
    console.log("Fetching responses for survey:", surveyId); // ✅ Debugging log

    const responses = await ResponseModel.find({ survey_id: surveyId })
      .populate({
        path: "question_id",
        model: "Question", // ✅ Ensure correct reference
        select: "_id question_text", // ✅ Fetch only necessary fields
      })
      .populate({
        path: "respondent_id",
        model: "users", // ✅ Ensure correct reference
        select: "_id firstName lastName email", // ✅ Fetch only necessary fields
      });

    console.log("Populated responses:", responses); // ✅ Debugging log

    if (!responses || responses.length === 0) {
      return res
        .status(404)
        .json({ message: "No responses found for this survey." });
    }

    res.status(200).json({
      message: "Responses retrieved successfully",
      data: responses,
    });
  } catch (err) {
    console.error("Error fetching responses:", err); // ✅ Debugging log
    res.status(500).json({ message: err.message });
  }
};

module.exports = { submitResponse, getResponsesBySurvey };
