// controllers/result.controller.js
const ResultModel = require("../model/result.model");
const QuizModel = require("../model/quiz.model");

const submitResult = async (req, res) => {
  try {
    const { subject, answers } = req.body;
    const userId = req.user.id;

    const quiz = await QuizModel.findOne({ subject });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    quiz.questions.forEach((question) => {
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

const getUserResults = async (req, res) => {
  try {
    const userId = req.user.id;
    const results = await ResultModel.find({ user: userId }).populate("user", "name email");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllResults = async (req, res) => {
  try {
    const results = await ResultModel.find().populate("user", "name email");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getPublicLeaderboard = async (req, res) => {
  try {
    const subject = req.query.subject;
    let filter = {};
    if (subject) filter.subject = subject;

    const results = await ResultModel.find(filter)
      .populate("user", "name email")
      .sort({ score: -1, createdAt: 1 })
      .limit(10);

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { submitResult, getUserResults, getAllResults, getPublicLeaderboard };
