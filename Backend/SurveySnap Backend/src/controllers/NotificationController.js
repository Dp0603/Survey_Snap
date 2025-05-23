const NotificationModel = require("../models/NotificationModel");

const sendNotification = async (req, res) => {
  try {
    const savedNotification = await NotificationModel.create(req.body);
    res.status(201).json({
      message: "Notification sent successfully",
      data: savedNotification,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find().populate("survey_id");
    res.status(200).json({
      message: "Notifications retrieved successfully",
      data: notifications,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { sendNotification, getUserNotifications };
