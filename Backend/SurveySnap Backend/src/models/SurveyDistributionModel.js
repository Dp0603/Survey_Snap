const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const distributionSchema = new Schema(
  {
    survey_id: {
      type: Schema.Types.ObjectId,
      ref: "roles",
      required: true,
    },
    distributed_to: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    sent_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Distribution", distributionSchema);
