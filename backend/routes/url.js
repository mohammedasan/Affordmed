import express from "express";
import shortid from "shortid";
import Url from "../models/Url.js";

const router = express.Router();

// POST /api/url/shorten
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "Original URL is required" });
    }

    // Generate a short code
    const shortCode = shortid.generate();

    const shortUrl = `${process.env.BASE_URL}/${shortCode}`;

    // Save to DB
    const newUrl = await Url.create({
      originalUrl,
      shortUrl,
    });

    res.status(201).json(newUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
