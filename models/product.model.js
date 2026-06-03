const mongoose =require('mongoose');
let prSchema = new mongoose.Schema({
    title:{type:String,require:true},
    price:{type:Number,require:true},
    img:{type:String,require:true},
})

let products = mongoose.model('products',prSchema);
module.exports = products;