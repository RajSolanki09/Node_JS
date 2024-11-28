const express = require('express');
const DB = require('./db');
const student = require('./student.model');

const app = express()

app.use(express.json())

app.get('/students',async(req,res)=>{
    const data = await student.find()
    res.send(data)
})

app.get('/student/:id', async (req, res) => {
    let { id } = req.params;
    const data = await student.findById(id);
    res.send(data);
});

app.post('/students',async(req,res)=>{
    const data = await student.create(req.body)
    res.send(data)
})

app.patch('/students/:id', async (req, res) => {
    let { id } = req.params;
    const data = await student.findByIdAndUpdate(id, req.body, { new: true });
    res.send(data);
});

app.delete('/students/:id', async (req, res) => {
    let { id } = req.params;
    const data = await student.findByIdAndDelete(id);
    res.send(data);
});

app.listen (8090,()=>{
    console.log('lisiting on http://localhost:8090');
    DB()
})