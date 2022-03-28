const express = require('express');
const router = express.Router();

const {getProducts, addProduct, getProductsByCatagory, getProductsById, getProductsBySearch} = require('../controller/productController');
const {getUser, addUser} = require('../controller/userController')

router.get('/' , (req,res)=>{
  res.send("this is the home url /");
})

router.post('/addToStock' , addProduct);
router.get('/getAllProducts', getProducts);

// product routes
router.post('/getProductsByCategory', getProductsByCatagory);
router.post('/getProductsById', getProductsById);
router.post('/getProductsBySearch', getProductsBySearch);


// user routes
router.post('/addUser', addUser);
router.post('/getUsers', getUser);

// router.get('getProductDetail/${id}' , getProductDetail)


module.exports = router;