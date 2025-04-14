const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema(
  {
    survey_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },
    total_responses: {
      type: Number,
      default: 0,
    },
    response_data: {
      type: mongoose.Schema.Types.Mixed, // Allow JSON/object data
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analytics", analyticsSchema);
