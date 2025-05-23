const ResponseModel = require("../models/ResponseModel");
const SurveyModel = require("../models/SurveyModel");

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
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAvailableSurveys = async (req, res) => {
  try {
    const availableSurveys = await SurveyModel.find({ status: "Active" });

    return res.status(200).json({
      message: "Available surveys retrieved successfully",
      data: availableSurveys,
    });
  } catch (error) {
    console.error("Error in getAvailableSurveys:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch available surveys" });
  }
};

const getCompletedSurveys = async (req, res) => {
  const userId = req.params.userId;
  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const responses = await ResponseModel.find({ userId, status: "completed" })
      .populate("surveyId", "title description")
      .lean();

    const completedSurveys = responses.map((response) => response.surveyId);

    return res.status(200).json({
      message: "Completed surveys retrieved successfully",
      data: completedSurveys,
    });
  } catch (error) {
    console.error("Error in getCompletedSurveys:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch completed surveys" });
  }
};

const getPendingSurveys = async (req, res) => {
  const userId = req.params.userId;
  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const responses = await ResponseModel.find({ userId }).lean();
    const completedSurveyIds = responses.map((response) =>
      response.surveyId.toString()
    );

    const pendingSurveys = await SurveyModel.find({
      status: "Active",
      _id: { $nin: completedSurveyIds },
    });

    return res.status(200).json({
      message: "Pending surveys retrieved successfully",
      data: pendingSurveys,
    });
  } catch (error) {
    console.error("Error in getPendingSurveys:", error);
    return res.status(500).json({ message: "Failed to fetch pending surveys" });
  }
};

const getResponsesBySurveyId = async (req, res) => {
  const { surveyId } = req.params;

  try {
    const responses = await ResponseModel.find({ surveyId })
      .populate("answers.questionId")
      .lean();

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

    return res.status(200).json({ data: flatResponses });
  } catch (error) {
    console.error("Error in getResponsesBySurveyId:", error);
    return res.status(500).json({ message: "Failed to fetch responses" });
  }
};

const getRespondentSurveyStats = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const responses = await ResponseModel.find({
      userId,
      status: "completed",
    })
      .populate("surveyId", "title description")
      .lean();

    const formatted = responses.map((resp, idx) => ({
      id: idx + 1,
      _id: resp._id,
      userId: userId,
      surveyTitle: resp.surveyId?.title || "Untitled",
      status: resp.status,
      submittedOn: new Date(resp.createdAt).toLocaleString(),
    }));

    return res.status(200).json(formatted);
  } catch (err) {
    console.error("Survey stats fetch error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getResponseById = async (req, res) => {
  const { responseId } = req.params;

  try {
    const response = await ResponseModel.findById(responseId)
      .populate("surveyId", "title description")
      .populate(
        "answers.questionId",
        "question_text text question_type options"
      )
      .lean();

    if (!response) {
      return res.status(404).json({ message: "Response not found" });
    }

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in getResponseById:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  submitResponse,
  getRespondentSurveyStats,
  getResponsesBySurveyId,
  getResponseById,
  getAvailableSurveys,
  getCompletedSurveys,
  getPendingSurveys,
};
