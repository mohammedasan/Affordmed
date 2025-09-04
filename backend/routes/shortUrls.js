import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/shorturls/shorten
 * Create a new short URL
 * Protected route (requires JWT)
 */
router.post("/shorten", auth, async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Generate short code if not provided
    const shortCode = shortcode || nanoid(6);

    // Set expiry date (validity in minutes)
    const expiryDate = new Date(Date.now() + validity * 60000);

    // Save to database
    const newUrl = await Url.create({
      originalUrl: url,
      shortCode,
      expiryDate,
      user: req.user.id, // link URL to the user
    });

    res.status(201).json({
      shortLink: `http://localhost:5000/r/${newUrl.shortCode}`,
      expiry: expiryDate.toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /api/shorturls/:code
 * Get stats for a short URL
 * Protected route (requires JWT)
 */
router.get("/:code", auth, async (req, res) => {
  try {
    const { code } = req.params;
    const url = await Url.findOne({ shortCode: code });

    if (!url) return res.status(404).json({ error: "Short URL not found" });
    if (url.user.toString() !== req.user.id)
      return res.status(403).json({ error: "Unauthorized" });

    res.json({
      originalUrl: url.originalUrl,
      createdAt: url.createdAt,
      expiryDate: url.expiryDate,
      clicks: url.clicks.length,
      clickDetails: url.clicks,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET /r/:code
 * Redirect a short URL to its original URL
 * Public route (no authentication needed)
 */
router.get("/r/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const url = await Url.findOne({ shortCode: code });

    if (!url) return res.status(404).json({ error: "Short URL not found" });
    if (url.expiryDate < new Date())
      return res.status(410).json({ error: "Short URL expired" });

    // Track click
    url.clicks.push({
      timestamp: new Date(),
      referrer: req.get("Referrer") || "direct",
      location: req.ip,
    });
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
