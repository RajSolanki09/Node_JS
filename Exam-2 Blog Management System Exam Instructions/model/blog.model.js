const { ObjectId } = require('bson');
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: ObjectId,
    createdAt: Date
})

const Blog = mongoose.model('Blog', BlogSchema)

module.exports = Blog