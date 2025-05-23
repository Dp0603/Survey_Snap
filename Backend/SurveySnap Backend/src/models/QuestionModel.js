const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    survey_id: { type: Schema.Types.ObjectId, ref: "Survey", required: true },
    question_text: { type: String, required: true },
    question_type: {
      type: String,
      enum: [
        "Multiple Choice",
        "Short Text",
        "Long Text",
        "Rating Scale",
        "Dropdown",
      ],
      required: true,
    },
    is_required: { type: Boolean, default: false },
    questionimageURL: { type: String },
    options: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);
