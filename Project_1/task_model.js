const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskName: String,
    description: String,
    status: String
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task