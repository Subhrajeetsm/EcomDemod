const express = require('express');
let mongoose = require('mongoose');
const cors = require('cors');
const products = require('./products');

const app = express();
const port = 3000;

app.use(cors());


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
//api they will send details i have to store it
app.post('/products',(req,res)=>{
  const{id,
    title,image,price
  }=req.body
  let newproducts={id,title,image,price}
  products.push(newproducts)
  res.json({"msg":"product are added sucessfull"})
})
// http://localhost:3000/products/1/user/91
app.get('/products/:n', (req, res) => {
    let id = req.params.n;
    res.json(products[id - 1]);
});
// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});