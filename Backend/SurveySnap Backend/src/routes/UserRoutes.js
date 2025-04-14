// //router
// const routes = require("express").Router()
// //controller --> userController
// const userController = require("../controllers/UserController")
// //routes.post("/user",userController.addUser)

// routes.post("/login",userController.loginUser)
// routes.post("/signup",userController.signup)
// routes.post("/user",userController.addUser1)
// routes.get("/users",userController.getAllUsers)
// routes.get("/user/:id",userController.getUserById)
// routes.delete("/user/:id",userController.deleteUserById)
// //get
// //post
// //delete
// //get

// module.exports = routes


const routes = require("express").Router();
const userController = require("../controllers/UserController");

// ✅ Signup & Login Routes
routes.post("/signup", userController.signup);
routes.post("/login", userController.loginUser);

// ✅ CRUD Operations for Users
routes.post("/user", userController.addUser);
routes.get("/users", userController.getAllUsers);
routes.get("/user/:id", userController.getUserById);
routes.put("/user/:id", userController.updateUserById); // ✅ New Update Route
routes.delete("/user/:id", userController.deleteUserById);
routes.post("/user/forgotpassword",userController.forgotPassword)
routes.post("/user/resetpassword",userController.resetPassword)

module.exports = routes;
