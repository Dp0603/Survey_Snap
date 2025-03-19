const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const analyticsSchema = new Schema(
  {
    survey_id: {
      type: Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },
    total_responses: {
      type: Number,
      default: 0,
    },
    response_data: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Analytics", analyticsSchema);
