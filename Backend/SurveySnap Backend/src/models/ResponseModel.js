const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema(
  {
    survey_id: {
      type: Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },
    question_id: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    respondent_id: {
      type: Schema.Types.ObjectId,
      ref: "Response",
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Response", responseSchema);
