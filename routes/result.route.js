const express = require("express");
const { submitResult, getUserResults, getAllResults } = require("../controller/result.controller");
const { authMiddleware, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

// Submit result (User)
router.post("/", authMiddleware, submitResult);

// Get logged-in user results
router.get("/my-results", authMiddleware, getUserResults);

// Get all results (Admin only)
router.get("/", authMiddleware, isAdmin, getAllResults);

module.exports = router;
