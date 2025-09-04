import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import shortUrlRoutes from "./routes/shortUrls.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON body

// Routes
app.use("/api/auth", authRoutes);            // signup/login
app.use("/api/url", shortUrlRoutes);         // POST /api/url/shorten
app.post("/api/test", (req, res) => {
  res.json({ message: "POST works!" });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err.message));

// Default route
app.get("/", (req, res) => {
  res.send("URL Shortener API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
