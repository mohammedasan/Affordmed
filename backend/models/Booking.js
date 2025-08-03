const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'ready for delivery', 'completed'], 
    default: 'pending' 
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
