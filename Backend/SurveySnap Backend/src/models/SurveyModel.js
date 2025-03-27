// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const surveySchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//     },
//     creator_id: {
//       type: Schema.Types.ObjectId,
//       ref: "roles",
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["Active", "Closed", "Draft"],
//       default: "Draft",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Survey", surveySchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    creator_id: { type: Schema.Types.ObjectId, ref: "users", required: true },
    status: {
      type: String,
      enum: ["Active", "Closed", "Draft"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Survey", surveySchema);
