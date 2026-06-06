const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

let connection = require('./config/db');
const limiter = require('./middleware/ratelimit');

let productRoutes = require('./routes/productRoutes');
let authRoutes = require('./routes/authRoutes');

const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());
app.use(limiter);

// routes
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

// start server
app.listen(port, async () => {
    await connection();
    console.log(`server running on port ${port}`);
});