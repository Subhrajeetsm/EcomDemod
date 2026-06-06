let products = require('../models/product.model')
exports.createproduct=async(req,res)=>{
    try{
        const {title,price,img}=req.body
     await   products.create({title,price,img})
        res.json({"msg":"product saved"})
    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
}

exports.getproduct=async(req,res)=>{
   try {
    let maxlimit = req.query.limit;
   // let shipment = req.query.location;
    let allproducts = await products.find().limit(Number(maxlimit));
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
}

exports.updateproduct=async(req,res)=>{
    try{
        let productid =req.params.id
      await  products.findByIdAndUpdate(productid,req.body)
      res.json({"msg":"product Update"})
    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
}


exports.deleteproduct=async(req,res)=>{
    try{
        let productid =req.params.id
      await  products.findByIdAndDelete(productid)
      res.json({"msg":"product deleted"})
    }
    catch(error)
    {
        res.json({"msg":error.message})
    }
}
exports.bulkinsert = async (req, res) => {
    try {
        await Products.insertMany(req.body); 
        res.json({ msg: "products saved successfully" });
    } catch (error) {
        res.json({ msg: error.message });
    }
};