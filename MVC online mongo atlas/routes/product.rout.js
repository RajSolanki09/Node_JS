const { Router } = require("express")
const { createProduct, getProduct, getProductByUserId } = require("../controller/product.controller")
const productRouter = Router()

productRouter.post("/", createProduct)
productRouter.get("/", getProduct)
productRouter.get("/user/:userId", getProductByUserId)

module.exports = productRouter