const Result = require('../models/Result');

const createResult = async (req, res) => {
  const { examId, questionId, score } = req.body;
  const studentId = req.user._id;
  try {
    const result = new Result({ studentId, examId, questionId, score });
    await result.save();
    res.status(201).json({ message: 'Result created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createResult, getResults };
