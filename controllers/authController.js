const users = require('../models/usermodels')
const bcrypt =require('bcrypt')
const jwt=require('jsonwebtoken')
const mail = require('../utill/gmail')
const dotenv=require('dotenv').config();

exports.register=async (req,res)=>{
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
        let payload={username:username,email:email}
        let token = await jwt.sign(payload,process.env.secretkey,{expiresIn:'1hr'})
        res.json({"msg":"regisation succesful",token})
        mail(email);
    }
    catch(error)
    {
        res.json({"msg":error.message})
        res.json({"msg":"error from Register database"})
        console.log("error from Register database");
    }
}


exports.login=async(req,res)=>{
    try{
        const {username,password} = req.body
         if(!username || !password){
            return res.json({"msg":"missing fileds"})
        }
        let detuser = await users.findOne({username})
        if(!detuser) return res.json({"msg":"invlaid user name or password"})
        let checkpassword=await bcrypt.compare(password,detuser.password)
        if(!checkpassword) return res.json({"msg":"invalid user name or password"})
            //verify token
            let token = req.headers.authorization.split(' ')[1]
            let isverify = jwt.verify(token,process.env.secretkey)
            if(!isverify) return res.json({"msg":"invalid token"})
            res.json({"msg":"Loging"})
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
}