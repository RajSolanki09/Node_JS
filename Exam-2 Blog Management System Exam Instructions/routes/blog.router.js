const { Router } = require("express")
const { createBlog, getBlog, getBlogByUserId, updateBlogById, deleteBlogByUserId } = require("../controllers/blogController")
const BlogRouter = Router()

BlogRouter.post("/blogPosts", createBlog)
BlogRouter.get("/blogPosts", getBlog)
BlogRouter.get("/blogPosts/:id", getBlogByUserId)
BlogRouter.patch("/blogposts/:id", updateBlogById)
BlogRouter.delete("/blogPosts/:id", deleteBlogByUserId)

module.exports = BlogRouter