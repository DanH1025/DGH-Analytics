const express = require('express');
const router = express.Router();

const {getProducts, addProduct } = require('../controller/productController');

router.get('/' , (req,res)=>{
  res.send("this is the home url /");
})

router.post('/addToStock' , addProduct);

router.get('/getAllProducts', getProducts);




module.exports = router;