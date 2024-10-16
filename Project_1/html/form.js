import taskAPI from "./api.js";

let id = -1;

const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value,
    };

    if (id === -1) {
        await taskAPI.post(task);
    } else {
        await taskAPI.patch(id, task);
        id = -1;
        document.getElementById('type').textContent = 'Submit';
    }

    getTasks();  // Fetch the updated list of tasks
};

const uimaker = (tasks) => {
    const listElement = document.getElementById('list');
    listElement.innerHTML = '';

    tasks.forEach((task) => {
        const div = document.createElement('div');
        div.className = 'task-card card mb-3 p-3';

        const taskName = document.createElement('h4');
        taskName.innerHTML = `Task Name: ${task.taskName}`;

        const description = document.createElement('p');
        description.innerHTML = `Description: ${task.description}`;

        const status = document.createElement('p');
        status.innerHTML = `Status: ${task.status}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "Delete";
        deleteBtn.className = 'btn btn-danger me-2';
        deleteBtn.addEventListener('click', async () => {
            await taskAPI.delete(task._id);
            getTasks();
        });

        const updateBtn = document.createElement('button');
        updateBtn.innerHTML = 'Update';
        updateBtn.className = 'btn btn-secondary';
        updateBtn.addEventListener('click', () => handleUpdate(task));

        div.append(taskName, description, status, deleteBtn, updateBtn);
        listElement.append(div);
    });
};

const handleUpdate = (task) => {
    document.getElementById('taskName').value = task.taskName;
    document.getElementById('description').value = task.description;
    document.getElementById('status').value = task.status;
    document.getElementById('type').textContent = 'Update';
    id = task._id;
};

const getTasks = async () => {
    const tasks = await taskAPI.get();
    uimaker(tasks);
};

getTasks();  // Fetch tasks when the page loads

document.getElementById('form').addEventListener('submit', handleSubmit);
