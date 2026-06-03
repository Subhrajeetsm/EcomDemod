const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const products = require('./products');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

async function connection() {
    await mongoose.connect('');
}

// step 3 create a schema
let productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true }
});

// step 4 model
let productModel = mongoose.model('products', productSchema);

// Fact API
app.get('/fact', (req, res) => {
    res.json({
        data: ["cat is an animal"]
    });
});

// Products API
app.get('/products', (req, res) => {
    res.json(products);
});

// Add product to MongoDB from Postman
app.post('/products', async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { title, price, img } = req.body;

        let newProduct = await productModel.create({
            title,
            price,
            img
        });

        console.log("Saved Product:", newProduct);

        res.json({
            msg: "product added successfully",
            data: newProduct
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            msg: "Error while saving product",
            error: err.message
        });
    }
});

// http://localhost:3000/products/1
app.get('/products/:n', (req, res) => {
    let id = req.params.n;
    res.json(products[id - 1]);
});

// Start Server
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);

    await connection();

    console.log("db is connected");
});