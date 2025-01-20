const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
