const express = require('express')
const dbconnection = require('./config/db.js');
const productRoute = require("./routes/product.routes.js")

const PORT = process.env.PORT || 8080;
const app = express()


app.use(express.json())
app.use("/products", productRoute)
app.get("/", (req, res) => {
    res.send("Welcome to the server");
})



app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
    dbconnection();
})