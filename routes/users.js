const User = require("../models/users");
const userRouter = require("express").Router();
const userController = require("../controllers/users");

userRouter.get("/", userController.getAllUsers);

userRouter.get("/:id", userController.getUserById);

userRouter.post("/", userController.registerUser);

module.exports = userRouter;
