const Question = require('../models/Question');
const Exam = require('../models/Exam');

exports.createQuestion = async (req, res) => {
    try {
        const { questionText, options, answer, examId } = req.body;
        
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ message: 'Exam not found' });
        }

        const newQuestion = new Question({
            questionText,
            options,
            answer,
            examId
        });

        await newQuestion.save();
        res.status(201).json({ message: 'Question created successfully', newQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Error creating question', error });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;
        const { questionText, options, answer } = req.body;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        question.questionText = questionText;
        question.options = options;
        question.answer = answer;

        await question.save();
        res.status(200).json({ message: 'Question updated successfully', question });
    } catch (error) {
        res.status(500).json({ message: 'Error updating question', error });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;

        const question = await Question.findByIdAndDelete(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting question', error });
    }
};

exports.getQuestionsByExam = async (req, res) => {
    try {
        const examId = req.params.examId;
        
        const questions = await Question.find({ examId });
        if (!questions.length) {
            return res.status(404).json({ message: 'No questions found for this exam' });
        }

        res.status(200).json({ questions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const questionId = req.params.id;

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json({ question });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching question', error });
    }
};
