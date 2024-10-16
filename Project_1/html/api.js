const taskAPI = {
    post: async (task) => {
        let req = await fetch("http://localhost:8888/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        return req.ok && req.json();
    },

    get: async () => {
        let req = await fetch("http://localhost:8888/");
        return req.ok && req.json();
    },

    patch: async (id, task) => {
        let req = await fetch(`http://localhost:8888/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        return req.ok && req.json();
    },

    delete: async (id) => {
        let req = await fetch(`http://localhost:8888/${id}`, {
            method: "DELETE"
        });

        return req.ok && true;
    }
};

export default taskAPI;
