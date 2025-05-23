const AnalyticsModel = require("../models/AnalyticsReportsModel");
const UserModel = require("../models/UserModel");
const SurveyModel = require("../models/SurveyModel");
const ResponseModel = require("../models/ResponseModel");
const QuestionModel = require("../models/QuestionModel");

const getFullReport = async (req, res) => {
  try {
    const [userRoles, surveys, questions, responses, analytics] =
      await Promise.all([
        UserModel.aggregate([
          {
            $lookup: {
              from: "roles",
              localField: "roleId",
              foreignField: "_id",
              as: "role",
            },
          },
          { $unwind: "$role" },
          {
            $group: {
              _id: "$role.name",
              count: { $sum: 1 },
            },
          },
        ]),
        SurveyModel.countDocuments(),
        QuestionModel.countDocuments(),
        ResponseModel.countDocuments(),
        AnalyticsModel.find().populate("survey_id", "title createdAt"),
      ]);

    const roleSummary = {};
    userRoles.forEach((r) => {
      roleSummary[r._id] = r.count;
    });

    const totalUsers = Object.values(roleSummary).reduce(
      (sum, val) => sum + val,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        users: totalUsers,
        userRoles: roleSummary,
        surveys,
        questions,
        responses,
        analytics,
      },
    });
  } catch (err) {
    console.error("Error in getFullReport:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {
  getFullReport,
};
