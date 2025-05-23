const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const jwt = require("jsonwebtoken");
const secret = "secret";

const addUser1 = async (req, res) => {
  try {
    const createdUser = await userModel.create(req.body);
    res.status(201).json({
      message: "User created successfully.",
      data: createdUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user.",
      data: err,
    });
  }
};

const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;

    const createdUser = await userModel.create(req.body);

    const emailSubject =
      "🎉 Welcome to SurveySnap - Your Survey Journey Begins!";
    const emailBody = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 80%;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: #007bff;
            color: white;
            padding: 15px;
            text-align: center;
            font-size: 22px;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
            color: #333;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            background: #007bff;
            color: white;
            padding: 12px 18px;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Welcome to SurveySnap, ${createdUser.firstName}!</div>
          <div class="content">
            <p>We're thrilled to have you on board! 🚀</p>
            <p>With SurveySnap, you can:</p>
            <ul>
              <li>✅ Create and customize surveys with ease.</li>
              <li>📊 Collect and analyze responses in real-time.</li>
              <li>🔗 Share surveys effortlessly.</li>
            </ul>
            <p>Click the button below to log in and get started:</p>
            <p style="text-align: center;">
              <a href="https://surveysnap.com/login" class="button">Login to Your Account</a>
            </p>
            <p>If you need any assistance, reach out to us at <a href="mailto:support@surveysnap.com">support@surveysnap.com</a>.</p>
          </div>
          <div class="footer">Happy Surveying! 🎉<br><strong>SurveySnap Team</strong></div>
        </div>
      </body>
      </html>`;

    await mailUtil.sendingMail(createdUser.email, emailSubject, emailBody);

    res.status(201).json({
      message: "User successfully created. A welcome email has been sent!",
      data: createdUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error occurred during signup.",
      data: err,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await userModel.findOne({ email }).populate("roleId");

    if (!foundUser) {
      return res.status(404).json({ message: "Email not found." });
    }

    const isMatch = bcrypt.compareSync(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password." });
    }

    res.status(200).json({
      message: "User successfully logged in.",
      data: foundUser,
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login.", error: err });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().populate("roleId");
    res.json({
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users.", data: err });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({
      message: "User fetched successfully.",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user.", data: err });
  }
};

const updateUserById = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating user.", data: err });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json({
      message: "User deleted successfully.",
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user.", data: err });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const foundUser = await userModel.findOne({ email: email });

    if (!foundUser) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }

    const token = jwt.sign({ _id: foundUser._id }, secret, {
      expiresIn: "10m",
    });
    const url = `http://localhost:5173/resetpassword/${token}`;

    const emailSubject = "🔐 Reset Your Password - SurveySnap";

    const emailBody = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            width: 80%;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: #dc3545;
            color: white;
            padding: 15px;
            text-align: center;
            font-size: 22px;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
            color: #333;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            background: #dc3545;
            color: white;
            padding: 12px 18px;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 14px;
            color: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">Reset Your Password</div>
          <div class="content">
            <p>Hello ${foundUser.firstName || "User"},</p>
            <p>We received a request to reset your <strong>SurveySnap</strong> account password.</p>
            <p>If you didn’t make this request, you can safely ignore this email.</p>
            <p>Otherwise, click the button below to reset your password. This link will expire in <strong>10 minutes</strong>:</p>
            <p style="text-align: center;">
              <a href="${url}" class="button">Reset Password</a>
            </p>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p><a href="${url}">${url}</a></p>
            <p>If you have any questions, contact us at <a href="mailto:support@surveysnap.com">support@surveysnap.com</a>.</p>
          </div>
          <div class="footer">
            Stay Secure,<br>
            <strong>SurveySnap Team</strong>
          </div>
        </div>
      </body>
      </html>`;

    await mailUtil.sendingMail(email, emailSubject, emailBody);

    res.json({ message: "Reset password link sent to your email." });
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

const resetPassword = async (req, res) => {
  const token = req.body.token;
  const newPassword = req.body.password;

  const userFromToken = jwt.verify(token, secret);
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  await userModel.findByIdAndUpdate(userFromToken._id, {
    password: hashedPassword,
  });
  res.json({ message: "Password updated successfully." });
};

module.exports = {
  addUser: addUser1,
  signup,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  forgotPassword,
  resetPassword,
};
