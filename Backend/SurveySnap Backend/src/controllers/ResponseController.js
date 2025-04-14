const ResponseModel = require("../models/ResponseModel");

const getResponsesBySurveyId = async (req, res) => {
  const { surveyId } = req.params;

  try {
    const responses = await ResponseModel.find({ surveyId })
      .populate("answers.questionId") // to get question text
      .lean();

    // Flatten answers
    const flatResponses = [];
    responses.forEach((resp) => {
      resp.answers.forEach((ans) => {
        flatResponses.push({
          _id: resp._id,
          survey_id: resp.surveyId,
          respondent_id: resp.userId,
          question_id: ans.questionId,
          response: ans.answer,
        });
      });
    });

    res.status(200).json({ data: flatResponses });
  } catch (error) {
    console.error("Error in getResponsesBySurveyId:", error);
    res.status(500).json({ message: "Failed to fetch responses" });
  }
};

const submitResponse = async (req, res) => {
  try {
    const { userId, surveyId, answers } = req.body;

    if (!userId || !surveyId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newResponse = new ResponseModel({
      userId,
      surveyId,
      status: "completed",
      answers,
    });

    await newResponse.save();

    return res.status(200).json({
      message: "Survey response submitted successfully",
      data: newResponse,
    });
  } catch (error) {
    console.error("Error in submitResponse:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getRespondentSurveyStats = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const completed = await ResponseModel.countDocuments({
      userId,
      status: "completed",
    });

    const pending = await ResponseModel.countDocuments({
      userId,
      status: "pending",
    });

    const SurveyModel = require("../models/SurveyModel");
    const totalSurveys = await SurveyModel.countDocuments();
    const available = totalSurveys - completed;

    return res.status(200).json({
      completed,
      pending,
      available: available >= 0 ? available : 0,
    });
  } catch (err) {
    console.error("Survey stats fetch error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  submitResponse,
  getRespondentSurveyStats,
  getResponsesBySurveyId,
};
