const mongoose = require('mongoose');

const DB = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/db');
    console.log('Connected to DB');
};

module.exports = DB;
