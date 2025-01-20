const Question = require('../models/Question');

const createQuestion = async (req, res) => {
  const { text, options, correctOption } = req.body;
  try {
    const question = new Question({ text, options, correctOption });
    await question.save();
    res.status(201).json({ message: 'Question created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { text, options, correctOption } = req.body;
  try {
    const question = await Question.findByIdAndUpdate(id, { text, options, correctOption }, { new: true });
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    await Question.findByIdAndDelete(id);
    res.json({ message: 'Question deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = { createQuestion, updateQuestion, deleteQuestion };
