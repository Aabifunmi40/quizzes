const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  questions: [
    {
      number: { type: Number, required: true },
      questionText: { type: String, required: true },
      options: [
        {
          text: { type: String, required: true },
          isCorrect: { type: Boolean, required: true },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Quiz', quizSchema);