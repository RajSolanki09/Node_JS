const express = require('express');
const dbConnect = require('./db');
const Task = require('./task_model');
const isValid = require('./validation');
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const data = await Task.find();
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch tasks', message: error.message });
    }
});

app.post("/", isValid, async (req, res) => {
    try {
        const data = await Task.create(req.body);
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: 'Failed to create task', message: error.message });
    }
});

app.patch("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update task', message: error.message });
    }
});

app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Task.findByIdAndDelete(id);
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete task', message: error.message });
    }
});

app.listen(8888, () => {
    console.log("Server is running on port 8888");
    dbConnect();
});
