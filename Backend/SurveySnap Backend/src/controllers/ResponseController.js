const ResponseModel = require("../models/ResponseModel");

const submitResponse = async (req, res) => {
  try {
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
    const responses = await ResponseModel.find({ survey_id: surveyId }).populate("question_id respondent_id");
    res.status(200).json({
      message: "Responses retrieved successfully",
      data: responses,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { submitResponse, getResponsesBySurvey };
