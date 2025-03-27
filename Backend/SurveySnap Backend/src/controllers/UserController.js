const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil");
const jwt = require("jsonwebtoken");
const secret = "secret"; // ✅ Added secret key for JWT

// ✅ Add User (Create)
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

// ✅ Signup with Password Encryption & Email Notification
const signup = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;

    const createdUser = await userModel.create(req.body);

    // ✅ Construct a professional email
    const emailSubject =
      "🎉 Welcome to SurveySnap - Your Survey Journey Begins!"; // ✅ Fixed missing quotes
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

    // ✅ Send Email
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

// ✅ Login User
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

// ✅ Get All Users (Read)
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

// ✅ Get User by ID (Read)
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

// ✅ Update User by ID (Update)
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

// ✅ Delete User by ID (Delete)
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

// ✅ Forgot Password
const forgotPassword = async (req, res) => {
  const email = req.body.email;
  const foundUser = await userModel.findOne({ email: email });

  if (foundUser) {
    const token = jwt.sign(foundUser.toObject(), secret);
    console.log(token);
    const url = `http://localhost:5173/resetpassword/${token}`;
    const mailContent = `<html><a href="${url}">Reset Password</a></html>`;

    await mailUtil.sendingMail(foundUser.email, "Reset Password", mailContent);
    res.json({ message: "Reset password link sent to mail." });
  } else {
    res.json({ message: "User not found. Register first." });
  }
};

// ✅ Reset Password
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

// ✅ Export Functions
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
