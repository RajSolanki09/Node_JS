const { Router } = require("express");
const upload = require("../Middlewares/multer");
const Blog = require("../Models/Blog.schema");
const checkNotAdmin = require("../Middlewares/checkAdminRole");

const BlogRouter = Router();

BlogRouter.get("/", (req, res) => {
  res.render("blog");
});

BlogRouter.get("/create", (req, res) => {
  res.render("create-blog");
});

BlogRouter.get("/blogs", async (req, res) => {
  try {
    const { category } = req.query.category;
    let blogs;

    if (category) blogs = await Blog.find({ category });
    else blogs = await Blog.find();

    res.send(blogs);
  } catch (err) {
    res.status(500).send("Error fetching blogs");
  }
});

BlogRouter.post("/create", upload.single("image"), async (req, res) => {
  const { title, content, category } = req.body;
  const author = req.cookies.role === "admin" ? req.cookies.id : null;

  if (!author) {
    return res.send("You are not authorized to access this page.");
  }

  if (!req.file) {
    return res.send("Image is required");
  }

  try {
    const newBlog = new Blog({
      title,
      content,
      Image: req?.file?.path,
      author,
      category,
    });
    await newBlog.save();
    res.send(`Blog created by ${author}`);
    res.cookie("blogId", newBlog._id);
  } catch (err) {
    res.status(500).send("Error creating blog");
  }
});

BlogRouter.get("/singleBlog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleBlog = await Blog.findById(id);
    if (!singleBlog) return res.status(404).send("Blog not found");
    res.render("singleBlogPage", { singleBlog });
  } catch (error) {
    res.status(500).send("Error fetching blog");
  }
});

BlogRouter.patch("/blog/like/:id", async (req, res) => {
  const { id } = req.params;
  const username = req.cookies.username;

  if (!username) return res.status(401).send("Login required to like a blog");

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).send("Blog not found");

    if (blog.likes.includes(username)) {
      return res.status(400).send("You have already liked this blog");
    }

    blog.likes.push(username);
    await blog.save();

    res.json({ message: "Blog liked", blog });
  } catch (error) {
    res.status(500).send("Error liking blog");
  }
});

BlogRouter.patch("/blog/comment/:id", async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const username = req.cookies.username;

  if (!username) return res.status(401).send("Login required to comment");

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).send("Blog not found");

    blog.comments.push({ username, text: comment, date: new Date() });
    await blog.save();

    res.json({ message: "Comment added", blog });
  } catch (error) {
    res.status(500).send("Error adding comment");
  }
});

BlogRouter.get("/search", async (req, res) => {
  try {
    const query = req.query.blogs;
    const blogs = await Blog.find();

    const options = {
      keys: ["author", "category", "title"],
    };

    const fuse = new Fuse(blogs, options);
    const result = fuse.search(query);

    res.json(result.map((item) => item.item));
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

module.exports = BlogRouter;
