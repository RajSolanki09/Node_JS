const { Router } = require("express");
const { getProduct, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");

const productRoute = Router();
productRoute.get("/", getProduct);
productRoute.get("/:ProductId", getProductById);
productRoute.post("/", createProduct);
productRoute.patch("/:ProductId", updateProduct);
productRoute.delete("/:ProductId", deleteProduct)

module.exports = productRoute;