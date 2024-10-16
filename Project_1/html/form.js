const handleForm = async (e) => {
    e.preventDefault();

    const taskData = {
        taskName: document.getElementById('taskName').value,
        description: document.getElementById('description').value,
        status: document.getElementById('status').value
    };

    try {
        await axios.post('http://localhost:8888/', taskData);
        fetchTasks(); 
        taskForm.reset();
    } catch (error) {
        console.error("Error creating task:", error);
    }
};

document.getElementById("taskForm").addEventListener('submit', handleForm);

const fetchTasks = async () => {
    try {
        const response = await axios.get('http://localhost:8888/'); 
        document.getElementById('taskList').innerHTML = ''; // Ensure this ID is correct

        response.data.map(task => {
            document.getElementById('taskList').innerHTML += `
                <div class="card mb-3" id="task-${task._id}">
                    <div class="card-body">
                        <h5 class="card-title"><strong>Task:</strong> ${task.taskName}</h5>
                        <p class="card-text"><strong>Description:</strong> ${task.description}</p>
                        <p class="card-text"><strong>Status:</strong> ${task.status}</p>
                        <button id="delete-btn-${task._id}" class="btn btn-danger">Delete</button>
                    </div>
                </div>
            `;
        });

        response.data.forEach(task => {
            const deleteButton = document.getElementById(`delete-btn-${task._id}`);
            deleteButton.addEventListener('click', () => {
                deleteTask(task._id);
            });
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
};

const deleteTask = async (taskId) => {
    try {
        await axios.delete(`http://localhost:8888/${taskId}`);
        fetchTasks(); 
    } catch (error) {
        console.error("Error deleting task:", error);
    }
};

// Fetch tasks on page load
fetchTasks();
