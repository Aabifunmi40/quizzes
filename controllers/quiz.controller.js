const mongoose = require('mongoose');
const QuizModel = require('../model/quiz.model');

const createQuiz = async (req, res) => {
  try {
    const { subject, questions } = req.body;
    if (!subject || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Subject and non-empty questions array are required' });
    }
    for (const q of questions) {
      if (!q.question || !Array.isArray(q.options) || q.options.length === 0 || !q.correctAnswer) {
        return res.status(400).json({ message: 'Each question must have text, options, and a correct answer' });
      }
    }
    const numberedQuestions = questions.map((q, index) => ({
      number: index + 1,
      questionText: q.question,
      options: q.options.map((opt) => ({
        text: opt,
        isCorrect: opt === q.correctAnswer,
      })),
    }));
    const quiz = new QuizModel({ subject, questions: numberedQuestions });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getQuizzes = async (req, res) => {
  try {
    const { subject } = req.query;
    const filter = subject ? { subject: new RegExp(subject, 'i') } : {};
    const quizzes = await QuizModel.find(filter).select('subject questions');
    if (!quizzes.length) {
      return res.status(404).json({ message: 'No quizzes found for the specified filter' });
    }
    res.status(200).json({ quizzes, count: quizzes.length });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid quiz ID' });
    }
    const quiz = await QuizModel.findById(id).select('subject questions');
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, questions } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid quiz ID' });
    }
    if (!subject || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Subject and non-empty questions array are required' });
    }
    for (const q of questions) {
      if (!q.question || !Array.isArray(q.options) || q.options.length === 0 || !q.correctAnswer) {
        return res.status(400).json({ message: 'Each question must have text, options, and a correct answer' });
      }
    }
    const numberedQuestions = questions.map((q, index) => ({
      number: index + 1,
      questionText: q.question,
      options: q.options.map((opt) => ({
        text: opt,
        isCorrect: opt === q.correctAnswer,
      })),
    }));
    const quiz = await QuizModel.findByIdAndUpdate(
      id,
      { subject, questions: numberedQuestions },
      { new: true }
    );
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz updated successfully', quiz });
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid quiz ID' });
    }
    const quiz = await QuizModel.findByIdAndDelete(id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
const deleteSingleQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;

    const quiz = await QuizModel.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    quiz.questions = quiz.questions.filter(
      (q) => q._id.toString() !== questionId
    );

    await quiz.save();
    res.status(200).json({ message: "Question deleted successfully", quiz });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update a single question inside a quiz
const updateSingleQuestion = async (req, res) => {
  try {
    const { quizId, questionId } = req.params;
    const { number, questionText, options } = req.body;

    const quiz = await QuizModel.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    const question = quiz.questions.id(questionId);
    if (!question) return res.status(404).json({ message: "Question not found" });

    question.number = number || question.number;
    question.questionText = questionText || question.questionText;
    question.options = options || question.options;

    await quiz.save();
    res.status(200).json({ message: "Question updated successfully", quiz });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = { createQuiz, getQuizzes, getQuizById, updateQuiz, deleteQuiz , updateSingleQuestion, deleteSingleQuestion};