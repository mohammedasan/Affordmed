const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const serviceRoutes = require("./routes/serviceRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");

dotenv.config();
const app = express();

// DB
connectDB();

// CORS configuration
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://bike-service-frontend.onrender.com", // use actual URL here
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});
