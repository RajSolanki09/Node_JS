const Exam = require('../models/Exam');
const Question = require('../models/Question');

exports.createExam = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newExam = new Exam({ title, description });
    await newExam.save();

    res.status(201).json({ message: 'Exam created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { title, description } = req.body;

    const exam = await Exam.findByIdAndUpdate(examId, { title, description }, { new: true });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json({ message: 'Exam updated successfully', exam });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findByIdAndDelete(examId);
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
