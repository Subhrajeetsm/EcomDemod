const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const products = require('./products');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
async function connection() {
    try {

        // OLD DATABASE NAME (disabled)
        // await mongoose.connect('mongodb://localhost:27017/SiliconEcomE');

        // EXISTING DATABASE
        await mongoose.connect('mongodb://localhost:27017/siliconEcomE');

        console.log("DB is connected");
    } catch (err) {
        console.log("DB Connection Error:", err);
    }
}

// Product Schema
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

// Product Model
const productModel = mongoose.model('products', productSchema);

// Fact API
app.get('/fact', (req, res) => {
    res.json({
        data: ["cat is an animal"]
    });
});

// Get all products from MongoDB
app.get('/products', async (req, res) => {
    try {
        const allProducts = await productModel.find();
        res.json(allProducts);
    } catch (err) {
        res.status(500).json({
            msg: "Error fetching products",
            error: err.message
        });
    }
});

// Add product to MongoDB
app.post('/products', async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const { title, price, img } = req.body;

        const newProduct = await productModel.create({
            title,
            price,
            img
        });

        console.log("Saved Product:", newProduct);

        res.status(201).json({
            msg: "Product added successfully",
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

// Get single product by MongoDB ID
app.get('/products/:id', async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                msg: "Product not found"
            });
        }

        res.json(product);

    } catch (err) {
        res.status(500).json({
            msg: "Error fetching product",
            error: err.message
        });
    }
});



// Start Server
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await connection();

    // Uncomment only when you want to insert sample products once
    // await createSampleProducts();
});