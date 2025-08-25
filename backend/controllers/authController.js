
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

let otpStore = {};        // For registration OTPs
let resetOtpStore = {};   // For forgot password OTPs

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Reusable email sender
const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Bike Service App" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

// ====== REGISTER OTP ======
const sendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;

    await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}. It is valid for 5 minutes.`);

    console.log(`Registration OTP for ${email}: ${otp}`);
    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP", error: err });
  }
};

const registerUser = async (req, res) => {
  const { name, email, mobile, password, role, otp } = req.body;
  console.log("Register request body:", req.body);
  try {
    if (!otpStore[email] || otpStore[email] != otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    delete otpStore[email];

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password generated");

    const user = await User.create({ name, email, mobile, password: hashedPassword, role });
    console.log("User created:", user);

    const token = generateToken(user._id);
    console.log("JWT token generated");

    res.status(201).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Register Error:", err.message, err);
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};


// ====== LOGIN ======
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      token: generateToken(user._id),
      user: { _id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};

// ====== FORGOT PASSWORD OTP ======
const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    resetOtpStore[email] = otp;

    await sendEmail(email, "Password Reset OTP", `Your password reset OTP is ${otp}. It is valid for 5 minutes.`);

    console.log(`Password Reset OTP for ${email}: ${otp}`);
    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send reset OTP", error: err });
  }
};

const verifyResetOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!resetOtpStore[email] || resetOtpStore[email] != otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    res.json({ message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed", error: err });
  }
};

const resetPassword = async (req, res) => {
  const { email, newPassword, otp } = req.body;
  try {
    if (!resetOtpStore[email] || resetOtpStore[email] != otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    delete resetOtpStore[email];

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ message: "Failed to reset password", error: err });
  }
};

module.exports = {
  sendOtp,
  registerUser,
  loginUser,
  sendResetOtp,
  verifyResetOtp,
  resetPassword
};
