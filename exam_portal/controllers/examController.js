const Exam = require('../models/Exam');

const createExam = async (req, res) => {
  const { title, questions, createdBy } = req.body;
  try {
    const exam = new Exam({ title, questions, createdBy });
    await exam.save();
    res.status(201).json({ message: 'Exam created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateExam = async (req, res) => {
  const { id } = req.params;
  const { title, questions } = req.body;
  try {
    const exam = await Exam.findByIdAndUpdate(id, { title, questions }, { new: true });
    res.json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteExam = async (req, res) => {
  const { id } = req.params;
  try {
    await Exam.findByIdAndDelete(id);
    res.json({ message: 'Exam deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createExam, updateExam, deleteExam };
