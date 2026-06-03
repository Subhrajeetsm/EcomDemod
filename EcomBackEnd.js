//express server
const express =require('express')

const cors =require('cors')
const app=express()
//midel wire
app.use(express.json())
app.use(cors())
const bcrypt =require('bcrypt')
let connection = require('./config/db')
let products=  require('./models/product.model')
let users = require('./models/usermodels')
const { message } = require('telegraf/filters')
const port = 3000;


app.post('/products',async(req,res)=>{
    try{
        const {title,price,img}=req.body
     await   products.create({title,price,img})
        res.json({"msg":"product saved"})
    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
})

app.get('/products',async(req,res)=>{
    try{
        let allproducts=await products.find()
        res.json(allproducts)
    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
})


app.put('/products/:id',async(req,res)=>{
    try{
        let productid =req.params.id
      await  products.findByIdAndUpdate(productid,req.body)
      res.json({"msg":"product Update"})
    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
})


app.delete('/products/:id',async(req,res)=>{
    try{
        let productid =req.params.id
      await  products.findByIdAndDelete(productid)
      res.json({"msg":"product deleted"})
    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
})


//user
//register
app.post('./register',async (req,res)=>{
    try{
        const{username,password,email,role}=req.body
        if(!username || !email || !role){
            return res.json({"msg":"missing fileds"})
        }
        let fetchuser = users.findOne({username})
        if(fetchuser) return res.json({"msg":"user exits"})
        await users.create({username,password,email,role})
        
        res.json({"msg":"regisation succesful"})
    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
})
async function bycript(params) {
    
}




app.listen(port,()=>{
    console.log(`the server is run on ${port}`);
})
