const express = require('express');
const router = express.Router();

   
const {getProducts, getAllProducts,addProduct, getProductsByCatagory, getProductsById,
         getProductsBySearch ,deleteProduct ,editProductValues ,recordSearchHistory ,
         recordAddToCartHistory,changeVisits,getActiveProducts ,getDiactiveProducts,commentHandler ,getComments} =  
  require('../controller/productController');


const {getUser, getAllUser, addUserByPhone , getAdminUser, verifyAdmin, 
        addUserByEmail, checkUser, checkEmail } =   require('../controller/userController')


const {addOrder, getOrders, getInprogressOrders, getOrdersbyId, changeStatus} =  require('../controller/ordersController')
const { addOrderDetail, getOrderDetails, getTopProductByQuan, getTopProductByTotalSale } =  require('../controller/orderDetailController');
const { getOrderReports, getLastWeekOrderReports, getTotalOrder, addOrderReport , updateReports} = 
  require('../controller/orderReportController');
const { getOrderLogs, addOrderLog ,getUserLogs, getUserLogInHour} = 
  require('../controller/orderLogController')
const {loginWithPhone , adminRegister } = 
  require('../controller/loginController')

const {getAllCategories} = require('../controller/categoryController')

const {getNewProductManager , accessKeyGenerator , saveAccessKey, activatePM, diactivatePM} = require('../controller/productManagerController')



const { route } = require('express/lib/application');

const { users, userEmails, deleteP, verify} = require('../controller/api')


router.get('/' , (req,res)=>{
  res.send("this is the home url /");
})


router.post('/update' , updateReports);

// router.get('getProductDetail/${id}' , getProductDetail)
router.post('/getAdminUser' , getAdminUser);
router.post('/getAdminUserVer', verifyAdmin ,getOrderLogs);
// router.post('/addAdmin', addUserByEmail)
router.post('/adminRegister' , adminRegister)


// user log routes
router.post('/addUserLogs', addOrderLog);
router.post('/getUserLogs', getOrderLogs);
router.post('/getUserLogCount', getUserLogs);
router.post('/getUserLogCountInDay', getUserLogInHour);

// test user api
router.post('/app', users);
router.post('/appUser', userEmails);
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
router.get('/getAllProducts' ,getAllProducts);
router.get('/getActiveProducts' , getActiveProducts)
router.get('/getDiactiveProducts', getDiactiveProducts)

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
router.post('/addUserByEmail', addUserByEmail)
router.post('/getUsers', getUser); 
router.post('/getAllUsers' , getAllUser)
router.post('/checkUserPhone', checkUser)
router.post('/checkEmail', checkEmail)

//get product manager route
router.get('/getNewProductManager' , getNewProductManager)


// order routes
router.post('/addOrder', addOrder);
router.post('/getOrders', getOrders);
router.post('/getInprogressOrders', getInprogressOrders);
router.post('/getOrdersById', getOrdersbyId)
router.post('/changeStatus', changeStatus)

// orderDetail routes
router.post('/addOrderDetail', addOrderDetail);
router.post('/getOrdersDetail', getOrderDetails);
router.post('/getTopProductByQuan', getTopProductByQuan);
router.post('/getTopProductByTotalSale', getTopProductByTotalSale);

//search record router
router.post('/productSearchRecord' , recordSearchHistory);

//addToCart record router
router.post('/addToCartRecord' , recordAddToCartHistory )

//login routes
router.post('/loginWithPhone', loginWithPhone);

 

//generate access key for product manager
router.post('/generateAccessKey' , accessKeyGenerator)
router.post('/saveAccessKey' , saveAccessKey);

//activate admin user

router.post('/activation' , activatePM)
router.post('/diactivation', diactivatePM)


//submitting comment
router.post('/addComment', commentHandler);
router.post('/getComment' , getComments)

module.exports = router;
 