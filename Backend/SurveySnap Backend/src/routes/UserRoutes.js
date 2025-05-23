const routes = require("express").Router();
const userController = require("../controllers/UserController");

routes.post("/signup", userController.signup);
routes.post("/login", userController.loginUser);

routes.post("/user", userController.addUser);
routes.get("/users", userController.getAllUsers);
routes.get("/user/:id", userController.getUserById);
routes.put("/user/:id", userController.updateUserById);
routes.delete("/user/:id", userController.deleteUserById);
routes.post("/user/forgotpassword", userController.forgotPassword);
routes.post("/user/resetpassword", userController.resetPassword);

module.exports = routes;
