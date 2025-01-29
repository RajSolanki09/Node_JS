const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user');
const app = express();
app.use(express.json());

app.use('/api/v1/users', userRoutes);


app.listen(8090, () => {
    console.log("Server is running at port 8090");
    connectDB();
});