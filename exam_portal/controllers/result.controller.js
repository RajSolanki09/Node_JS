const Result = require("../models/result.model");

exports.addResult = async (req, res) => {
    try {
        const { examId, answers } = req.body;
        const result = await Result.create({
            studentId: req.user.id,
            examId,
            answers,
            marks: 0  
        });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getResults = async (req, res) => {
    try {
        const results = await Result.find({ studentId: req.user.id });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};