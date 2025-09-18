// controllers/result.controller.js
const ResultModel = require("../model/result.model");
const QuizModel = require("../model/quiz.model");

// Submit quiz result
const submitResult = async (req, res) => {
  try {
    const { subject, answers } = req.body; // answers = array of {questionId, selectedOptionId}
    const userId = req.user.id; // from JWT middleware

    const quiz = await QuizModel.findOne({ subject });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;

    // Check answers
    quiz.questions.forEach((question, index) => {
      const userAnswer = answers.find(ans => ans.questionId == question._id);
      if (userAnswer) {
        const correctOption = question.options.find(opt => opt.isCorrect);
        if (correctOption && correctOption._id.toString() === userAnswer.selectedOptionId) {
          score++;
        }
      }
    });

    const result = new ResultModel({
      user: userId,
      subject,
      score,
      totalQuestions: quiz.questions.length
    });

    await result.save();

    res.status(201).json({ message: "Result submitted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user results
const getUserResults = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware
    const results = await ResultModel.find({ user: userId }).populate("user", "name email");

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all results (Admin only)
const getAllResults = async (req, res) => {
  try {
    const results = await ResultModel.find().populate("user", "name email");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { submitResult, getUserResults, getAllResults };
