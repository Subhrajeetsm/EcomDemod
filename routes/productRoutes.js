const { Router } = require('express');
const {
  getproduct,
  createproduct,
  updateproduct,
  deleteproduct,
  bulkinsert
} = require('../controllers/productController');

let router = Router();

router.post('/', createproduct);          // single product
router.post('/bulk', bulkinsert);         // bulk insert
router.get('/', getproduct);
router.put('/:id', updateproduct);
router.delete('/:id', deleteproduct);

module.exports = router;