const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{
    option: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
