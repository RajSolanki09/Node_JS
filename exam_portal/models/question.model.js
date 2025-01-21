const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    text: String,
    options: [{
        text: String,
        isCorrect: Boolean
    }],
    marks: Number
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;