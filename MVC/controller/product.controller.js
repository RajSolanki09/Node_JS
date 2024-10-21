const Product = require("../model/product.model")

const createProduct = async (req, res) => {
    let data = await Product.create(req.body)
    res.send(data)
}

const getProduct = async (req, res) => {
    let data = await Product.find()
    res.send(data)
}
// Find By UserID
const getProductByUserId = async (res, req) => {
    let { userId } = req.params
    let data = await Product.find({ userId })
    res.send(data)
}
module.exports = { createProduct, getProduct, getProductByUserId }
