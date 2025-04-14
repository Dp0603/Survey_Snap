const SurveyDistributionModel = require("../models/SurveyDistributionModel");

const distributeSurvey = async (req, res) => { 
  try {
    const savedDistribution = await SurveyDistributionModel.create(req.body);
    res.status(201).json({
      message: "Survey distributed successfully",
      data: savedDistribution,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllDistributions = async (req, res) => { 
  try {
    const { surveyId } = req.params; 
    const distributions = await SurveyDistributionModel.find({ survey_id: surveyId });
    res.status(200).json({
      message: "Distributions retrieved successfully",
      data: distributions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { distributeSurvey, getAllDistributions }; // Ensure both functions are correctly exported
