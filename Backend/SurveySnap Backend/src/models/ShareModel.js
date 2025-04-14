const mongoose = require("mongoose");

const shareSchema = new mongoose.Schema(
  {
    surveyId: { type: mongoose.Schema.Types.ObjectId, ref: "Survey", required: true },
    recipient: { type: String, required: true },
    method: { type: String, enum: ["email", "sms", "whatsapp"], required: true },
    status: { type: String, default: "sent" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Share", shareSchema);
