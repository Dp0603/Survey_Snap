const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema(
  {
    survey_id: {
      type: Schema.Types.ObjectId,
      ref: "Survey", // ✅ Ensure "Survey" model exists
      required: true,
    },
    question_id: {
      type: Schema.Types.ObjectId,
      ref: "Question", // ✅ Ensure "Question" model exists
      required: true,
    },
    respondent_id: {
      type: Schema.Types.ObjectId,
      ref: "users", // ✅ Ensure "users" model exists (matches `UserModel.js`)
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
