const express = require("express");
const { 
  getAllServices, 
  getOwnerServices, 
  createService, 
  deleteService 
} = require("../controllers/serviceController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", getAllServices);
router.get("/owner", authMiddleware, getOwnerServices);
router.post("/", authMiddleware, createService);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;
