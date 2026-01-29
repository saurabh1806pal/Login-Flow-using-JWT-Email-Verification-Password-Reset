const express = require("express");

const userRouter = express.Router();

const userController = require("../controllers/user.controller");
const { authenticateUser } = require("../middleware/user.middleware");

userRouter.get("/profile", authenticateUser, userController.getUserProfile);

module.exports = userRouter;
