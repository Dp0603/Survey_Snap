const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil")

const addUser1 = async (req, res) => {
  //try-catch if-else...
  try {
    const createdUser = await userModel.create(req.body);
    res.status(201).json({
      message: "user created..",
      data: createdUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const signup = async (req, res) => {
  try {
    // encyrption password method
    const salt = bcrypt.genSaltSync(10);
    const hasedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hasedPassword;
    const createdUser = await userModel.create(req.body);
    await mailUtil.sendingMail(createdUser.email,"welcome to SurveySnap","this is welcome mail")
    res.status(201).json({
      message: "user succesfully created",
      data: createdUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error aavi che bhai",
      data: err,
    });
  }
};

const loginUser = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId");
  console.log(foundUserFromEmail);

  if (foundUserFromEmail != null) {
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);

    if (isMatch == true) {
      res.status(200).json({
        message: "user succesfully login",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid details...",
      });
    }
  } else {
    res.status(404).json({
      message: "Email not found...",
    });
  }
};
async function addUser(req, res) {
  //req.body...
  const savedUser = await userModel.create(req.body);
  res.json({
    message: "User Saved Successfully",
    data: savedUser,
  });
}
const getAllUsers = async (req, res) => {
  const users = await userModel.find().populate("roleId");
  res.json({
    message: "User fetched successfully..",
    data: users,
  });
};

const getUserById = async (req, res) => {
  const foundUser = await userModel.findById(req.params.id);
  res.json({
    message: "user fetched successfully..",
    data: foundUser,
  });
};

const deleteUserById = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "user deleted Successfully..",
    data: deletedUser,
  });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  addUser1,
  signup,
  loginUser,
};

//addUser
//getUser
//deleteUser
//getUserById
//exports
