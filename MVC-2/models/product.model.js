const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    img: String,
    price: Number,
    ratings: [{ username: String, Count: Number }],
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;