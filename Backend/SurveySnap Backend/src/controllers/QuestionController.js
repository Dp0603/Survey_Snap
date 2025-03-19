// const QuestionModel = require("../models/QuestionModel");
// const multer = require("multer");
// const path = require("path");
// const cloudinaryUtil = require("../utils/CloudinaryUtil");

// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({
//   storage: storage,
// }).single("image");

// const addQuestion = async (req, res) => {
//   try {
//     const savedQuestion = await QuestionModel.create(req.body);
//     res.status(201).json({
//       message: "Question added successfully",
//       data: savedQuestion,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getQuestionsBySurvey = async (req, res) => {
//   try {
//     const { surveyId } = req.params;
//     const questions = await QuestionModel.find({ survey_id: surveyId });
//     res.status(200).json({
//       message: "Questions retrieved successfully",
//       data: questions,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const addQuestionWithFile = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       res.status(500).json({
//         message: err.message,
//       });
//     } else {

//       const cloundinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
//         req.file
//       );
//       console.log(cloundinaryResponse);
//       console.log(req.body);

//       //store data in database
//       req.body.questionimageURL = cloundinaryResponse.secure_url;
//       const savedQuestion = await QuestionModel.create(req.body);

//       res.status(200).json({
//         message: "questionimage saved successfully",
//         data: savedQuestion,
//       });
//     }
//   });
// };

// module.exports = { addQuestion, getQuestionsBySurvey, addQuestionWithFile};



const QuestionModel = require("../models/QuestionModel");
const multer = require("multer");
const cloudinaryUtil = require("../utils/CloudinaryUtil");


const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");


const addQuestion = async (req, res) => {
  try {
    if (!req.body.questionimageURL) {
      return res.status(400).json({ message: "questionimageURL is required" });
    }

    const savedQuestion = await QuestionModel.create(req.body);
    res.status(201).json({
      message: "Question added successfully",
      data: savedQuestion,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addQuestionWithFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
      }

      const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(req.file);
      req.body.questionimageURL = cloudinaryResponse.secure_url; // Save URL to DB

      const savedQuestion = await QuestionModel.create(req.body);
      res.status(201).json({
        message: "Question added successfully",
        data: savedQuestion,
      });
    } catch (uploadError) {
      res.status(500).json({ message: uploadError.message });
    }
  });
};


const getQuestionsBySurvey = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const questions = await QuestionModel.find({ survey_id: surveyId });
    res.status(200).json({
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addQuestion, getQuestionsBySurvey, addQuestionWithFile };
