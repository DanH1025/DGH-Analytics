const express = require('express');
const router = express.Router();

const {getProducts, addProduct, getProductsByCatagory, getProductsById, getProductsBySearch} = 
  require('../controller/productController');

const {getUser, addUser} = 
  require('../controller/userController')
const {addOrder, getOrders} = 
  require('../controller/ordersController')
const { addOrderDetail, getOrderDetails } =
  require('../controller/orderDetailController')

const {users, deleteP} = require('../controller/api');

router.get('/' , (req,res)=>{
  res.send("this is the home url /");
})

router.post('/addToStock' , addProduct);
router.get('/getAllProducts', getProducts);

// product routes
router.post('/getProductsByCategory', getProductsByCatagory);
router.post('/getProductsById', getProductsById);
router.post('/getProductsBySearch', getProductsBySearch);
router.post('/deleteProductById' , deleteProduct)


router.post('/loginShit', users);
router.post("/users/:userId", deleteP);

// user routes
router.post('/addUser', addUser);
router.post('/getUsers', getUser);

// order routes
router.post('/addOrder', addOrder);
router.post('/getOrders', getOrders);

// orderDetail routes
router.post('/addOrderDetail', addOrderDetail);
router.post('/getOrdersDetail', getOrderDetails);

// router.get('getProductDetail/${id}' , getProductDetail)


module.exports = router;