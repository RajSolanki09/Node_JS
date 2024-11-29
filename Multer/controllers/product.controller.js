const Product = require("../models/product.model.js");


const createProduct = async (req, res) => {

    console.log(req.file)
    if (req.file) {
        req.body.img = req.file.path
    }

    try {
        let product = await Product.create(req.body);
        res.status(201).send(product);
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
};

const getProduct = async (req, res) => {
    try {
        let product = await Product.find();
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const { ProductId } = req.params;
        let product = await Product.findById(ProductId)
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { ProductId } = req.params;
        let product = await Product.findByIdAndUpdate(ProductId, req.body, { new: true });
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { ProductId } = req.params;
        let product = await Product.findByIdAndDelete(ProductId);
        res.status(200).send(product);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}


module.exports = { createProduct, getProduct, getProductById, updateProduct, deleteProduct }