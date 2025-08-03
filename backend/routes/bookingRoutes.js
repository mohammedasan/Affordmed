const express = require("express");
const { 
  createBooking, 
  getMyBookings, 
  getOwnerBookings, 
  updateBookingStatus 
} = require("../controllers/bookingController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.get("/my", authMiddleware, getMyBookings);
router.get("/owner", authMiddleware, getOwnerBookings);
router.put("/:id", authMiddleware, updateBookingStatus);

module.exports = router;
