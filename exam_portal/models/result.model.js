const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    examId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam'
    },
    marks: Number,
    answers: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
        selectedOption: Number
    }]
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;