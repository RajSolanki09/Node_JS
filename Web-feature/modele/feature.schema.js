const mongoose = require('mongoose');

// Playlist schema for individual song data
const playlistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;
