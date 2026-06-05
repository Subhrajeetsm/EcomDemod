//express server
const express =require('express')
const cors =require('cors')
const app=express()
let connection = require('./config/db')
const limiter = require('./middleware/ratelimit')
let productRoutes = require('./routes/productRoutes')
let authRoutes = require('./routes/authRoutes')
const dotenv=require('dotenv').config();
const port = process.env.port;


//midel wire
app.use(express.json())
app.use(cors())
app.use(limiter)



app.use('/products',productRoutes)
app.use('/auth',authRoutes)



app.listen(port, async () => {
    await connection();
    console.log(`the server is run on ${port}`);
});
