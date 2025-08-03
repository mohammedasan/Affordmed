import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Debug: Check if email credentials are loaded
console.log("Email User:", process.env.EMAIL_USER ? "Set" : "NOT SET");
console.log("Email Pass:", process.env.EMAIL_PASS ? "Set" : "NOT SET");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,        // your Gmail address
    pass: process.env.EMAIL_PASS         // Gmail App Password
  }
});

export const sendMail = async ({ to, subject, text }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent to:", to);
  } catch (err) {
    console.error("❌ Email failed:", err.message);
  }
};
