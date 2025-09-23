const QuizModel = require("../model/quiz.model");

// Create a quiz (Admin only)
const createQuiz = async (req, res) => {
  try {
    const { subject, questions } = req.body;

    if (!subject || !questions || questions.length === 0) {
      return res.status(400).json({ message: "Subject and questions are required" });
    }
    // Assign question numbers based on array index
    const numberedQuestions = questions.map((q, index) => ({
      ...q,
      number: index + 1,
    }));


    const quiz = new QuizModel({ subject, questions });
    await quiz.save();

    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all quizzes (optional filter by subject via query)
const getQuizzes = async (req, res) => {
  try {
    const { subject } = req.query;
    let quizzes;

    if (subject) {
      quizzes = await QuizModel.find({ subject });
    } else {
      quizzes = await QuizModel.find();
    }

    if (!quizzes || quizzes.length === 0) {
      return res.status(404).json({ message: "No quizzes found" });
    }

    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get quiz by ID
const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await QuizModel.findById(id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// delete quiz by id
const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await QuizModel.findByIdAndDelete(id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
module.exports = { createQuiz, getQuizzes, getQuizById ,deleteQuiz };
