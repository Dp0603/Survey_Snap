const SurveyModel = require("../models/SurveyModel");

const createSurvey = async (req, res) => {
  try {
    // Ensure the creator_id is present
    if (!req.body.creator_id) {
      return res.status(401).json({ message: "User ID is required!" });
    }

    // Validate startDate and endDate if provided
    if (
      req.body.startDate &&
      req.body.endDate &&
      new Date(req.body.startDate) > new Date(req.body.endDate)
    ) {
      return res
        .status(400)
        .json({ message: "Start date cannot be later than end date" });
    }

    // Save the survey
    const savedSurvey = await SurveyModel.create(req.body);
    res
      .status(201)
      .json({ message: "Survey created successfully", data: savedSurvey });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllSurveys = async (req, res) => {
  try {
    const surveys = await SurveyModel.find().populate(
      "creator_id",
      "firstName lastName email"
    );
    res.status(200).json({
      message: "All surveys retrieved successfully",
      data: surveys,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSurveyById = async (req, res) => {
  try {
    const survey = await SurveyModel.findById(req.params.id).populate(
      "creator_id",
      "firstName lastName email"
    );
    if (!survey) return res.status(404).json({ message: "Survey not found" });

    res
      .status(200)
      .json({ message: "Survey retrieved successfully", data: survey });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSurvey = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    // Validate startDate and endDate
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "Start date cannot be later than end date" });
    }

    // Update the survey
    const updatedSurvey = await SurveyModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Survey updated successfully", data: updatedSurvey });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSurvey = async (req, res) => {
  try {
    await SurveyModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Survey deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserSurveys = async (req, res) => {
  try {
    const userId = req.params.userId; // Get userId from URL
    if (!userId) {
      return res.status(400).json({ message: "User ID is required!" });
    }

    const surveys = await SurveyModel.find({ creator_id: userId });
    res.status(200).json({
      message: "User surveys retrieved successfully",
      data: surveys,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Added a function to fetch active surveys based on schedule
const getActiveSurveys = async (req, res) => {
  try {
    const currentDate = new Date();

    // Fetch active surveys that are ongoing based on startDate and endDate
    const activeSurveys = await SurveyModel.find({
      startDate: { $lte: currentDate },
      endDate: { $gte: currentDate },
      status: "Active",
    }).populate("creator_id", "firstName lastName email");

    res.status(200).json({
      message: "Active surveys retrieved successfully",
      data: activeSurveys,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createSurvey,
  getAllSurveys,
  getSurveyById,
  updateSurvey,
  deleteSurvey,
  getUserSurveys,
  getActiveSurveys, // Export the new function
};
