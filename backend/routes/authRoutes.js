const express = require("express");
const {
  sendOtp,         // Registration OTP
  registerUser,    // Register
  loginUser,       // Login
  sendResetOtp,    // Forgot password - send OTP
  verifyResetOtp,  // Forgot password - verify OTP
  resetPassword    // Forgot password - reset password
} = require("../controllers/authController.js");

const router = express.Router();

// Registration flow
router.post("/send-otp", sendOtp);
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot password flow
router.post("/forgot-password/send-otp", sendResetOtp);
router.post("/forgot-password/verify-otp", verifyResetOtp);
router.post("/forgot-password/reset", resetPassword);

module.exports = router;
