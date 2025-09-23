const express = require("express");
const router = express.Router();
const { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz } = require("../controllers/quizController");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, createQuiz);
router.get("/", authMiddleware, getQuizzes);
router.get("/:id", authMiddleware, getQuizById);
router.put("/:id", authMiddleware, updateQuiz);
router.delete("/:id", authMiddleware, deleteQuiz);

module.exports = router;