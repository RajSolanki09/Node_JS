const Question = require("../models/question.model");

exports.addQuestion = async (req, res) => {
  try {
    const { text, options, marks, examId } = req.body;
    const question = await Question.create({ text, options, marks, examId });
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestions = async (req, res) => {
  try {
    const { examId } = req.params;
    const questions = await Question.find({ examId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const updatedQuestion = await Question.findByIdAndUpdate(questionId, req.body, { new: true });
    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(questionId);
    res.json(deletedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestionsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const questions = await Question.find({ createdBy: userId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
