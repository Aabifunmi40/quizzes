const express = require("express");
const { submitResult, getUserResults, getAllResults } = require("../controllers/result.controller");
const { authMiddleware, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

// Submit result (User)
router.post("/", authMiddleware, submitResult);

// Get logged-in user results
router.get("/my-results", authMiddleware, getUserResults);

// Get all results (Admin only)
router.get("/", authMiddleware, isAdmin, getAllResults);

// Public leaderboard route for all logged-in users
router.get("/public", authMiddleware, async (req, res) => {
  try {
    const results = await ResultModel.find()
      .populate("user", "name email")
      .sort({ score: -1, date: 1 }) // top scores first
      .limit(10);                   // top 10 scores
    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
