const express = require('express');
const dbConnect = require('./db');
const User = require('./user.model');
const app = express()
app.use(express.json())


app.get("/", async (req, res) => {
    let data = await User.find()
    res.send(data)
})

app.post("/", async (req, res) => {
    let data = await User.create(req.body)
    res.send(data)
})
app.listen(8090, () => {
    console.log("Server is running on port 8090");
    // http://localhost:8090/
    dbConnect()
})
