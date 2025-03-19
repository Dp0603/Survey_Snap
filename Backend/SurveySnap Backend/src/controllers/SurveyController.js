const SurveyModel = require("../models/SurveyModel");

const createSurvey = async (req, res) => {
  try {
    const savedSurvey = await SurveyModel.create(req.body);
    res.status(201).json({
      message: "Survey created successfully",
      data: savedSurvey,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllSurveys = async (req, res) => {
  try {
    const surveys = await SurveyModel.find() // Populate name & email
    res.status(200).json({
      message: "All surveys retrieved successfully",
      data: surveys,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { createSurvey, getAllSurveys };


// const SurveyModel = require("../models/SurveyModel");

// const createSurvey = async (req, res) => {
//   try {
//     const lastSurvey = await SurveyModel.findOne().sort({ survey_id: -1 });
//     req.body.survey_id = lastSurvey ? lastSurvey.survey_id + 1 : 1;

//     const savedSurvey = await SurveyModel.create(req.body);
//     res.status(201).json({
//       message: "Survey created successfully",
//       data: savedSurvey,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getAllSurveys = async (req, res) => {
//   try {
//     const surveys = await SurveyModel.find().populate("creator_id");
//     res.status(200).json({
//       message: "All surveys retrieved successfully",
//       data: surveys,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { createSurvey, getAllSurveys };
