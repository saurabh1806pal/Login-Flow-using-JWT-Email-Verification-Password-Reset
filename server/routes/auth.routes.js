const express = require("express");

const authRouter = express.Router();

const authController = require("../controllers/auth.controller");
const { authenticateUser } = require("../middleware/user.middleware");

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authController.logout);
authRouter.post(
  "/send-verify-otp",
  authenticateUser,
  authController.sendVerifyOtp,
);
authRouter.post("/verify-otp", authenticateUser, authController.verifyAccount);
authRouter.get("/is-auth", authenticateUser, authController.isAuthenticated);
authRouter.post("/reset-password-otp", authController.sendResetOtp);
authRouter.post("/reset-password", authController.resetPassword);

module.exports = authRouter;
