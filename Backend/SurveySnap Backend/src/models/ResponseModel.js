const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const responseSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    surveyId: { type: Schema.Types.ObjectId, ref: "Survey", required: true },
    status: {
      type: String,
      enum: ["completed", "pending"],
      default: "completed",
    },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: "Question", required: true },
        answer: { type: Schema.Types.Mixed, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);
