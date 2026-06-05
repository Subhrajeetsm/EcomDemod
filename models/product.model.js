// const mongoose =require('mongoose');
// let prSchema = new mongoose.Schema({
//     title:{type:String,require:true},
//     price:{type:Number,require:true},
//     img:{type:String,require:true},
// })

// let products = mongoose.model('products',prSchema);
// module.exports = products;
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  price:  { type: Number, required: true },
  image:  { type: String, required: true },
  description: { type: String },
  category:    { type: String },
  rating: {
    rate:  { type: Number },
    count: { type: Number }
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);