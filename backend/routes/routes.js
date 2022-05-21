const express = require('express');
const router = express.Router();
   

const {getProducts, getAllProducts,addProduct, getProductsByCatagory, getProductsById,
         getProductsBySearch ,deleteProduct ,editProductValues ,recordSearchHistory ,recordAddToCartHistory,changeVisits } = 
  require('../controller/productController');


const {getUser, getAllUser, addUserByPhone , getAdminUser} =   
  require('../controller/userController')
const {addOrder, getOrders} =   
  require('../controller/ordersController')
const { addOrderDetail, getOrderDetails } =  
  require('../controller/orderDetailController');
const { getOrderReports, getLastWeekOrderReports, getTotalOrder, addOrderReport } = 
  require('../controller/orderReportController');
const { getOrderLogs, addOrderLog ,getUserLogs} = 
  require('../controller/orderLogController')
const {loginWithPhone , adminRegister } = 
  require('../controller/loginController')

const {getAllCategories} = require('../controller/categoryController')


const { route } = require('express/lib/application');

const { users, deleteP, verify} = require('../controller/api')


router.get('/' , (req,res)=>{
  res.send("this is the home url /");
})




// user log routes
router.post('/addUserLogs', addOrderLog);
router.post('/getUserLogs', getOrderLogs);
router.post('/getUserLogCount', getUserLogs);

// test user api
router.post('/app', users);
router.post('/appver', verify);
router.post('/appDelete', verify,  deleteP);

// report generator
router.post('/addOrderReport', addOrderReport);
router.post('/getOrderReport', getOrderReports);
router.post('/getLastWeekOrderReport', getLastWeekOrderReports);
router.post('/getTotal', getTotalOrder)

//get all the categories from db
router.get('/getAllCategories', getAllCategories)

// product routes
router.post('/addToStock' , addProduct); 
router.get('/getProducts', getProducts);
router.get('/getAllProducts' ,getAllProducts)

router.post('/getProductsByCategory', getProductsByCatagory);
router.post('/getProductsById', getProductsById);
router.post('/getProductsBySearch', getProductsBySearch);


router.post('/deleteProductById' , deleteProduct)
router.post('/editProduct' , editProductValues)

// product visit add routes
router.post('/addVisits', changeVisits)

// user routes
// router.post('/addUser', addUser);
router.post('/addUserByPhone', addUserByPhone)
router.post('/getUsers', getUser);
router.post('/getAllUsers' , getAllUser)

// order routes
router.post('/addOrder/userId', addOrder);
router.post('/getOrders', getOrders);

// orderDetail routes
router.post('/addOrderDetail', addOrderDetail);
router.post('/getOrdersDetail', getOrderDetails);

//search record router
router.post('/productSearchRecord' , recordSearchHistory);

//addToCart record router
router.post('/addToCartRecord' , recordAddToCartHistory )

//login routes
router.post('/loginWithPhone', loginWithPhone)

// router.get('getProductDetail/${id}' , getProductDetail)
router.post('/getAdminUser' , getAdminUser);

router.post('/adminRegister' , adminRegister)

module.exports = router;
