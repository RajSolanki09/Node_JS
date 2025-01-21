const Exam = require("../models/exam.model");
const Question = require("../models/question.model");

exports.createExam = async (req, res) => {
    try {
        const { title, duration, totalMarks } = req.body;
        const exam = await Exam.create({
            title,
            duration,
            totalMarks,
            teacherId: req.user.id
        });
        res.json(exam);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getExams = async (req, res) => {
    try {
        const exams = await Exam.find();
        res.json(exams);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};