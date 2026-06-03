const mongoose=require('mongoose');
const { applyTimestamps } = require('./product.model');
let userSchema = new mongoose.Schema({
    username:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    role:{type:String,require:true,unique:true}
},{timestamps:true})


let users=mongoose.model('users',userSchema);

module.exports=users;