const express = require('express')
const dbconnection = require('./config/db.js');
const productRoute = require("./routes/product.routes.js")

const PORT = process.env.PORT || 6060;
const app = express()
const path = require("path");

app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use("/products", productRoute)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "view/form.html"))
})


app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
    dbconnection();
})