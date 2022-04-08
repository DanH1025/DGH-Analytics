const express = require('express');
const router = express.Router();


const {getProducts, getAllProducts,addProduct, getProductsByCatagory, getProductsById,
         getProductsBySearch ,deleteProduct ,editProductValues ,recordSearchHistory ,recordAddToCartHistory,changeVisits } = 
  require('../controller/productController');


const {getUser, addUser} = 
  require('../controller/userController')
const {addOrder, getOrders} = 
  require('../controller/ordersController')
const { addOrderDetail, getOrderDetails } =
  require('../controller/orderDetailController');
const { route } = require('express/lib/application');

const { users, deleteP, verify} = require('../controller/api')


router.get('/' , (req,res)=>{
  res.send("this is the home url /");
})
// test user api
router.post('/app', users);
router.post('/appDelete', verify,  deleteP);


router.post('/addToStock' , addProduct); 
router.get('/getProducts', getProducts);
router.get('/getAllProducts' ,getAllProducts)

// product routes
router.post('/getProductsByCategory', getProductsByCatagory);
router.post('/getProductsById', getProductsById);
router.post('/getProductsBySearch', getProductsBySearch);


router.post('/deleteProductById' , deleteProduct)
router.post('/editProduct' , editProductValues)

// product visit add routes
router.post('/addVisits', changeVisits)

// user routes
router.post('/addUser', addUser);
router.post('/getUsers', getUser);

// order routes
router.post('/addOrder', addOrder);
router.post('/getOrders', getOrders);

// orderDetail routes
router.post('/addOrderDetail', addOrderDetail);
router.post('/getOrdersDetail', getOrderDetails);


//search record router
router.post('/productSearchRecord' , recordSearchHistory);
//addToCart record router
router.post('/addToCartRecord' , recordAddToCartHistory )



// router.get('getProductDetail/${id}' , getProductDetail)


module.exports = router;