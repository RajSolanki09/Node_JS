const Movie = require("../models/movie.schema");

const createMovie = async (req, res) => {
  try {
    let {
      title,
      description,
      releaseDate,
      category,
      actors,
      image,
      ratings,
      comments,
      addedBy,
    } = req.body;


  const movie = await Movie.create({
      title,
      description,
      releaseDate,
      category,
      actors,
      image,
      ratings,
      comments,
      addedBy,
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      releaseDate,
      category,
      actors,
      image,
      ratings,
      comments,
      addedBy,
    } = req.body;

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (releaseDate) updateFields.releaseDate = releaseDate;
    if (category) updateFields.category = category;
    if (actors) updateFields.actors = actors;
    if (image) updateFields.image = image;
    if (ratings) updateFields.ratings = ratings;
    if (comments) updateFields.comments = comments;
    if (addedBy) updateFields.addedBy = addedBy;

    const movie = await Movie.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ error: "movie not found" });
    }
    res.status(200).json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addRating = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    console.log(req.params, req.body, id, rating);
    if (rating < 0 || rating > 10) {
      return res.status(400).json({ error: "Rating must be between 0 and 10" });
    }
    const movie = await Movie.findById(id);
    console.log(movie);

    if (!movie) {
      return res.status(404).json({ error: "movie not found" });
    }
    movie.ratings.push({ value: rating });
    console.log(movie);

    await movie.create(); 
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: "movie not found" });
    }
    movie.comments.push({ text });
    await movie.save(); 
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const filterMovies = async (req, res) => {
  try {
    const { title, addedBy, releaseDate, category } = req.query;
    const query = {};
    if (title) query.title = title;
    if (addedBy) query.addedBy = addedBy;
    if (releaseDate) query.releaseDate = releaseDate;
    if (category) query.category = category;
    const movies = await Movie.find(query);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getAllMovies,
  addRating,
  addComment,
  filterMovies,
};