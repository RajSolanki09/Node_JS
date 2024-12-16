const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    actors: [
        {
            name: {
                type: String,
            },
        },
    ],
    image: {
        type: String,
    },
    ratings: [
        {
            value: {
                type: Number,
                min: 0,
                max: 10,
            },
        },
    ],
    comments: [
        {
            text: {
                type: String,
            },
        },
    ],
    addedBy: {
        type: String,
        required: true,
    },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;