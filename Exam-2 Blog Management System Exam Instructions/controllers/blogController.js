const Blog = require("../model/blog.model")

//create 
const createBlog = async (req, res) => {
    let data = await Blog.create(req.body)
    res.send(data)
}

//read
const getBlog = async (req, res) => {
    let data = await Blog.find()
    res.send(data)
}

// Update By Blog ID
const updateBlogById = async (req, res) => {
    let { id } = req.params;
    let data = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
        return res.send({ MSG: "Blog not found" });
    }
    return res.send({ MSG: "Blog updated successfully", data });
};

// Find By UserID
const getBlogByUserId = async (res, req) => {
    let { userId } = req.params
    let data = await Blog.find({ userId })
    res.send(data)
}

// Delete By UserId
const deleteBlogByUserId = async (req, res) => {
    let { id } = req.params;
    let data = await Blog.findByIdAndDelete(id);
    if (!data) {
        return res.send({ MSG: "Blog not found" })
    }
    else {
        return send({ MSG: "Blog deleted successfully", data });
    }
}
module.exports = { createBlog, getBlog, getBlogByUserId, updateBlogById, deleteBlogByUserId }