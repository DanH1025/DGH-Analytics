const express = require('express');
const router = express.Router();

const {getProducts, addProduct, getProductsByCatagory} = require('../controller/productController');

router.get('/' , (req,res)=>{
  res.send("this is the home url /");
})

router.post('/addToStock' , addProduct);

router.get('/getAllProducts', getProducts);
router.post('/getProductsByCategory', getProductsByCatagory);




module.exports = router;