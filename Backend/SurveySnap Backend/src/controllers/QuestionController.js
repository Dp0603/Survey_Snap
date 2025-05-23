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
    if (!req.body.survey_id) {
      return res.status(400).json({ message: "Survey ID is required!" });
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
    if (err) return res.status(500).json({ message: err.message });

    try {
      if (!req.body.survey_id) {
        return res.status(400).json({ message: "Survey ID is required!" });
      }

      let imageUrl = "";
      if (req.file) {
        const cloudinaryResponse = await cloudinaryUtil.uploadFileToCloudinary(
          req.file
        );
        if (!cloudinaryResponse.secure_url) {
          return res
            .status(500)
            .json({ message: "Failed to upload image to Cloudinary" });
        }
        imageUrl = cloudinaryResponse.secure_url;
      }

      const savedQuestion = await QuestionModel.create({
        ...req.body,
        questionimageURL: imageUrl || null,
      });

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
    if (!surveyId) {
      return res.status(400).json({ message: "Survey ID is required!" });
    }

    const questions = await QuestionModel.find({ survey_id: surveyId });

    if (!questions.length) {
      return res
        .status(404)
        .json({ message: "No questions found for this survey." });
    }

    res.status(200).json({
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await QuestionModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({
      message: "Question updated successfully",
      data: updatedQuestion,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await QuestionModel.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addQuestion,
  getQuestionsBySurvey,
  addQuestionWithFile,
  updateQuestion,
  deleteQuestion,
};
