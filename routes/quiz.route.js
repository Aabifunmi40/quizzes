const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/auth.middleware");
const { createQuiz, getQuizzes, getQuizById,deleteQuiz } = require("../controller/quiz.controller");

const router = express.Router();

// Admin creates a quiz
router.post("/", authMiddleware, isAdmin, createQuiz);

// Anyone can get quizzes (optionally filter by subject)
router.get("/", getQuizzes);

// Get a quiz by ID
router.get("/:id", getQuizById);

// delete quiz
router.delete("/:id",authMiddleware,deleteQuiz)

module.exports = router;
