const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title: String,
  duration: Number,  // in minutes
  totalMarks: Number,
  teacherId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;