//express server
const express =require('express')

const cors =require('cors')
const app=express()

//midel wire
app.use(express.json())
app.use(cors())

// app.use(function (req, res.next) {
//     console.log("hii am middleware");
// });



const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
let connection = require('./config/db')
let products=  require('./models/product.model')
let users = require('./models/usermodels')
let mail = require('./utill/gmail')
const limiter = require('./middleware/ratelimit')
const dotenv=require('dotenv').config();
// const { message } = require('telegraf/filters')
const port = process.env.port;

app.use(limiter)

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
   try {
    let maxlimit = req.query.limit;
    let shipment = req.query.location;
    let allproducts = await products.find().limit(Number(maxlimit));
    if (shipment === "india") {
        return res.json({ msg: `made in ${shipment}` });
    }
    //take token from ther headers using req.herader.key
    //jwt.verify(token)
    //if valid send msg invalid token
    res.json(allproducts);
    res.status(200).json({"msg":"products"})
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

// use ./register
app.post('/register',async (req,res)=>{
    try{
        const{username,password,email,role}=req.body
        if(!username || !email || !role){
            return res.json({"msg":"missing fileds"})
        }
        // let fetchuser = users.findOne({username})
        let fetchuser = await users.findOne({username})
        if(fetchuser) return res.json({"msg":"user exits"})

        let hashpass = await bcrypt.hash(password,10)
        await users.create({username,password:hashpass,email,role})
        //genrate token and send it to client
        let payload={username:username}
        let secretkey='subh123'
        let token = await jwt.sign(payload,secretkey,{expiresIn:'1hr'})
        res.json({"msg":"regisation succesful",token})
        mail(email);
    }
    catch(error)
    {
        res.json({"msg":error.message})
        res.json({"msg":"error from Register database"})
        console.log("error from Register database");
    }
})



//hasing function
// async function hashing(params) {
//     let name="rohan123"
//     let hashpass = await bcrypt.hash(name,10)
//     console.log(hashpass)    
// }
// hashing()



// app.listen(port,()=>{
//     console.log(`the server is run on ${port}`);
// })

//login
app.post('/login',async(req,res)=>{
    try{
        const {username,password} = req.body
         if(!username || !password){
            return res.json({"msg":"missing fileds"})
        }
        let detuser = await users.findOne({username})
        if(!detuser) return res.json({"msg":"invlaid user name or password"})
        let checkpassword=bcrypt.compare(password,detuser.password)
        if(!checkpassword) return res.json({"msg":"invalid user name or password"})
            let token = req.
            let currentlocation=res.headers.location
            res.json({"msg":"Loging",currentlocation})
        console.log("user login")

    /*
    let detuser = await users.findOne({ username });
    if (!detuser) {
        return res.json({ msg: "invalid user name or password" });
    }
    let checkpassword = await bcrypt.compare(password, detuser.password);
    if (!checkpassword) {
        return res.json({ msg: "invalid user name or password" });
    }
    // Password matched
    res.json({ msg: "Login successful" });
    */
    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
})



app.listen(port, async () => {
    await connection();
    console.log(`the server is run on ${port}`);
});
