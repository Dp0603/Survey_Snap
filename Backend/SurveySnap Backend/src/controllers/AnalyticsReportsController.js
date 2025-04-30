const AnalyticsModel = require("../models/AnalyticsReportsModel");
const UserModel = require("../models/UserModel");
const SurveyModel = require("../models/SurveyModel");
const ResponseModel = require("../models/ResponseModel");

// 🎯 Generate or update report
const generateReport = async (req, res) => {
  try {
    const { survey_id, total_responses, response_data } = req.body;

    console.log("Incoming Analytics Report:", { survey_id, total_responses });

    if (!survey_id || !response_data) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Ensure survey_id is a valid ObjectId string (basic length check)
    if (typeof survey_id !== "string" || survey_id.length !== 24) {
      return res.status(400).json({ message: "Invalid survey ID format" });
    }

    let report = await AnalyticsModel.findOneAndUpdate(
      { survey_id },
      {
        $set: {
          survey_id,
          total_responses,
          response_data,
        },
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      message: "Report saved successfully",
      data: report,
    });
  } catch (err) {
    console.error("Error generating report:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 📊 Get all analytics reports
const getSurveyAnalytics = async (req, res) => {
  try {
    const reports = await AnalyticsModel.find().populate(
      "survey_id",
      "title createdAt"
    );
    res.status(200).json({
      message: "Reports retrieved successfully",
      data: reports,
    });
  } catch (err) {
    console.error("Error retrieving reports:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔥 NEW: Get Recent Activity (users, surveys, responses)
const getRecentActivity = async (req, res) => {
  try {
    const recentUsers = await UserModel.find().sort({ createdAt: -1 }).limit(5);
    const recentSurveys = await SurveyModel.find()
      .sort({ createdAt: -1 })
      .limit(5);
    const recentResponses = await ResponseModel.find()
      .sort({ createdAt: -1 })
      .limit(5);

    const activities = [];

    recentUsers.forEach((u) =>
      activities.push({
        type: "user",
        message: `👤 New user ${u.firstName} ${u.lastName} registered`,
        time: u.createdAt,
      })
    );

    recentSurveys.forEach((s) =>
      activities.push({
        type: "survey",
        message: `📝 Survey "${s.title}" created`,
        time: s.createdAt,
      })
    );

    recentResponses.forEach((r) =>
      activities.push({
        type: "response",
        message: `✅ A response submitted by user ${r.userId}`,
        time: r.createdAt,
      })
    );

    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.status(200).json({ data: activities.slice(0, 6) });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  generateReport,
  getSurveyAnalytics,
  getRecentActivity, // 🆕 add this to exports
};
