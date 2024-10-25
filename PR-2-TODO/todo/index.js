const express = require('express');
const app = express();

app.use(express.json());

let initialTodo = [
    { title: "HTML", isCompleted: true, id: 1 },
    { title: "JavaScript", isCompleted: true, id: 2 },
    { title: "React", isCompleted: false, id: 3 }
];

app.get('/', (req, res) => {
    res.send('Welcome to the todo API');
});

app.get('/todos', (req, res) => {
    res.json(initialTodo);
});

app.post('/addtodo', (req, res) => {
    const { title, isCompleted } = req.body;

    if (!title || isCompleted === undefined) {
        return res.status(400).send({ error: "Invalid data" });
    }

    const newTodo = {
        title,
        isCompleted,
        id: initialTodo.length + 1
    };

    initialTodo.push(newTodo);
    res.status(201).send(newTodo);
});

app.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const { title, isCompleted } = req.body;
    
    let todo = initialTodo.find(t => t.id === parseInt(id));

    if (!todo) {
        return res.status(404).send({ error: "Todo not found" });
    }

    if (title) todo.title = title;
    if (isCompleted !== undefined) todo.isCompleted = isCompleted;

    res.send(todo);
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const index = initialTodo.findIndex(t => t.id === parseInt(id));

    if (index === -1) {
        return res.status(404).send({ error: "Todo not found" });
    }

    let deletedTodo = initialTodo.splice(index, 1)[0];
    res.send({ deletedTodo, todos: initialTodo });
});

app.get('/todo/:id', (req, res) => {
    const { id } = req.params;
    const todo = initialTodo.find(t => t.id === parseInt(id));

    if (!todo) {
        return res.status(404).send({ error: "Todo not found" });
    }

    res.send(todo);
});

app.get('/findbystatus', (req, res) => {
    const { isCompleted } = req.query;

    if (isCompleted === undefined) {
        return res.status(400).send({ error: "Query parameter 'isCompleted' is required" });
    }

    const filteredTodos = initialTodo.filter(todo => String(todo.isCompleted) === isCompleted);
    res.send(filteredTodos);
});

// Start the server
app.listen(8090, () => {
    console.log(`Server is running on 8090`);
});
