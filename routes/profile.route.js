const express = require("express");
const router = express.Router();
const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/profile.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");

// Get logged-in user's profile
router.get("/me", authMiddleware, getMyProfile);

// Update profile
router.put("/me", authMiddleware, updateMyProfile);

module.exports = router;
