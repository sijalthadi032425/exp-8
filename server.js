const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/inventoryDB")
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.log(err));

// Schema
const productSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number
});

// Model
const Product = mongoose.model("Product", productSchema);

// Insert Product
app.post("/add", async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.send("Product Added Successfully");
});

// View All Products
app.get("/view", async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

// Delete Product
app.delete("/delete/:id", async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product Deleted Successfully");
});

// Start Server
app.listen(3000, () => {
    console.log("🚀 Server Running at http://localhost:3000");
});
