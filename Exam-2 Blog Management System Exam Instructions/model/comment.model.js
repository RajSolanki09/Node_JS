const { ObjectId } = require("bson");
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content: String,
    author: ObjectId,
    blogPost: ObjectId,
    createdAt: Date
});
let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;