const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    grid: Number,
    course: String
});

const student = mongoose.model('student', studentSchema);

module.exports = student;
