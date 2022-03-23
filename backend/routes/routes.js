const express = require('express');
const router = express.Router();

const {getProducts, addProduct, getProductsByCatagory, getProductsById, getProductsBySearch} = require('../controller/productController');

router.get('/' , (req,res)=>{
  res.send("this is the home url /");
})

router.post('/addToStock' , addProduct);

router.get('/getAllProducts', getProducts);
router.post('/getProductsByCategory', getProductsByCatagory);
router.post('/getProductsById', getProductsById);
router.post('/getProductsBySearch', getProductsBySearch);

// router.get('getProductDetail/${id}' , getProductDetail)


module.exports = router;