const express = require("express");
const router = express.Router();

const { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } = require("../controllers/quiz.controller");
const { authMiddleware, isAdmin } = require("../middlewares/auth.middleware");

// Public or user-protected routes
router.get("/", authMiddleware, getQuizzes);
router.get("/:id", authMiddleware, getQuizById);

// Admin-only routes
router.post("/", authMiddleware, isAdmin, createQuiz);
router.put("/:id", authMiddleware, isAdmin, updateQuiz);
router.delete("/:id", authMiddleware, isAdmin, deleteQuiz);

module.exports = router;
