const Comment = require("../model/comment.model")

//create 
const createComment = async (req, res) => {
    let data = await Comment.create(req.body)
    res.send(data)
}

//read
const getComment = async (req, res) => {
    let data = await Comment.find()
    res.send(data)
}
// Delete By UserId
const deleteCommentByUserId = async (req, res) => {
    let { id } = req.params;
    let data = await Comment.findByIdAndDelete(id);
    if (!data) {
        return res.send({ MSG: "Comment not found" })
    }
    else {
        return send({ MSG: "Comment deleted successfully", data });
    }
}