const SurveyModel = require("../models/SurveyModel");
const UserModel = require("../models/UserModel");
const ResponseModel = require("../models/ResponseModel");

const getPlatformOverview = async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const totalSurveys = await SurveyModel.countDocuments();
    const totalResponses = await ResponseModel.countDocuments();

    res.status(200).json({
      message: "Platform overview fetched successfully",
      data: { totalUsers, totalSurveys, totalResponses },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch overview", error });
  }
};

const getTopSurveys = async (req, res) => {
  try {
    const topSurveys = await ResponseModel.aggregate([
      {
        $group: {
          _id: "$survey_id",
          responseCount: { $sum: 1 },
        },
      },
      {
        $sort: { responseCount: -1 },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "surveys",
          localField: "_id",
          foreignField: "_id",
          as: "surveyDetails",
        },
      },
      {
        $unwind: "$surveyDetails",
      },
      {
        $project: {
          _id: 1,
          title: "$surveyDetails.title",
          responseCount: 1,
        },
      },
    ]);

    res.status(200).json({
      message: "Top surveys retrieved",
      data: topSurveys,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching top surveys", err });
  }
};

const getUserSummary = async (req, res) => {
  try {
    const roles = await UserModel.aggregate([
      {
        $group: {
          _id: "$roleId",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      message: "User role summary fetched",
      data: roles,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user summary", err });
  }
};

module.exports = {
  getPlatformOverview,
  getTopSurveys,
  getUserSummary,
};
