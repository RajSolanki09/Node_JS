const express = require('express');
const cors = require('cors');  // Import CORS middleware
const dbConnect = require('./db');
const Task = require('./task_model');
const isValid = require('./validation');

const app = express();

// Enable CORS for all routes and all origins
app.use(cors({
    origin: '*'  // Allow requests from any origin (for development only)
}));

app.use(express.json());

app.get("/", async (req, res) => {
    let data = await Task.find();
    res.send(data);
});

app.post("/", isValid, async (req, res) => {
    let data = await Task.create(req.body);
    res.send(data);
});

app.patch("/:id", async (req, res) => {
    let { id } = req.params;
    let data = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.send(data);
});

app.delete("/:id", async (req, res) => {
    let { id } = req.params;
    let data = await Task.findByIdAndDelete(id);
    res.send(data);
});

app.listen(8888, () => {
    console.log("Server is running on port 8888");
    dbConnect();
});
