const { Router } = require("express")
const CommentRouter = Router()

CommentRouter.post("/comments:", createComment)
CommentRouter.get("/comments/:blogPostId:", getComment)
CommentRouter.delete("/comments/:id", deleteCommentByUserId)

module.exports = CommentRouter