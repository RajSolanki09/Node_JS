const mongoose = require("mongoose");
require('dotenv').config();

const DB_url = process.env.DB_url;

const dbconnection = async () => {
    try {
        await mongoose.connect(DB_url);
        console.log("Connected to the database");
    } catch (error) {
        console.log({ msg: error.message });
    }
};

module.exports = dbconnection;