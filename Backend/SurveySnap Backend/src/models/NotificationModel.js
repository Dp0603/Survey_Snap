const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    survey_id: {
      type: Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
