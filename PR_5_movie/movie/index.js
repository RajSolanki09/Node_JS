const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRouter = require("./Routes/user.router");
const movieRouter = require("./Routes/movie.router");
const app = express();
const port = 8090;

dotenv.config();
app.use(express.json());

app.use("/user", userRouter);
app.use("/movie", movieRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the movie API");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});