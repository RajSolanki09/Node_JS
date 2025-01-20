const Result = require('../models/Result');
const Exam = require('../models/Exam');

exports.getResultsByStudent = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        
        const results = await Result.find({ studentId });
        if (!results.length) {
            return res.status(404).json({ message: 'No results found for this student' });
        }

        res.status(200).json({ results });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching results', error });
    }
};

exports.submitResult = async (req, res) => {
    try {
        const { studentId, examId, answers } = req.body;

        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        let score = 0;
        exam.questions.forEach((question, index) => {
            if (answers[index] === question.answer) {
                score += 1;
            }
        });

        const result = new Result({
            studentId,
            examId,
            score,
            answers
        });

        await result.save();
        res.status(201).json({ message: 'Result submitted successfully', result });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting result', error });
    }
};

exports.getResultById = async (req, res) => {
    try {
        const resultId = req.params.id;

        const result = await Result.findById(resultId);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }

        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching result', error });
    }
};
