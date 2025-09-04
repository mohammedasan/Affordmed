import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  expiryDate: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  clicks: [
    {
      timestamp: { type: Date, default: Date.now },
      referrer: { type: String },
      location: { type: String },
    },
  ],
}, { timestamps: true });

export default mongoose.model("Url", urlSchema);
