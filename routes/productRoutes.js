const {Router}=require('express');
const  {getproduct,createproduct,updateproduct,deleteproduct}=require('../controllers/productController')
let router = Router();
router.post('/',createproduct)
router.get('/',getproduct)
router.put('/:id',updateproduct)
router.delete('/:id',deleteproduct)
module.exports=router