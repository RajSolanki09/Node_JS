const { Router } = require("express");
const { getProduct, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");
const upload = require("../utils/imageUpload");

const productRoute = Router();
productRoute.get("/", getProduct);
productRoute.get("/:ProductId", getProductById);
productRoute.post("/",upload.single("img"), createProduct);
productRoute.patch("/:ProductId", updateProduct);
productRoute.delete("/:ProductId", deleteProduct)

module.exports = productRoute;