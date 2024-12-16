const { Router } = require("express");
const { createMovie, updateMovie, deleteMovie, getAllMovies, addRating, addComment, filterMovies } = require("../controllers/movie.controller");

const movieRouter = Router();

movieRouter.post("/create", createMovie);
movieRouter.patch("/update/:id", updateMovie);
movieRouter.delete("/delete/:id", deleteMovie);
movieRouter.patch("/rating/:id", addRating);
movieRouter.patch("/comment/:id", addComment);
movieRouter.get("/filter", filterMovies);
movieRouter.get("/", getAllMovies);

module.exports = movieRouter;