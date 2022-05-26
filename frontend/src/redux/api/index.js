import axios from 'axios';

// axios.defaults.withCredentials = true;
axios.create({ withCredentials: true, })

const getAllCategoriesUrl =
'http://localhost:5000/api/getAllCategories'

const readProductUrl = 
  'http://localhost:5000/api/getProducts';
const readAllProductUrl =
  'http://localhost:5000/api/getAllProducts';
const addProducturl = 
  'http://localhost:5000/api/addToStock';
const readProductByCategoryUrl = 
  'http://localhost:5000/api/getProductsByCategory';

const readProductByIdUrl = 
  'http://localhost:5000/api/getProductsById';
const readProductBySearchUrl = 
  'http://localhost:5000/api/getProductsBySearch';

// users url
const readUserUrl = 
  'http://localhost:5000/api/getUsers'
const getAllUserUrl = 
  'http://localhost:5000/api/getAllUsers'
// const createUserUrl = 
//   'http://localhost:5000/api/addUser'
const createUserByPhoneNumberUrl = 
      'http://localhost:5000/api/addUserByPhone'
const loginWithPhoneUrl = 
      'http://127.0.0.1:5000/api/app'

// order report of last week
const readOrderReportUrl = 
  'http://localhost:5000/api/getLastWeekOrderReport'
 // today total order
const readOrderTotalUrl = 
    'http://localhost:5000/api/getTotal'
  
// orders url
const fetchOrdersUrl = 
  'http://localhost:5000/api/getOrders'
const fetchOrdersByIdUrl = 
  'http://localhost:5000/api/getOrdersById'
const createOrdersUrl = 
  'http://localhost:5000/api/addOrder'
  
// order details url
const createOrderDetailsUrl = 
  'http://localhost:5000/api/addOrderDetail'
const fetchOrderDetailsUrl = 
  'http://localhost:5000/api/getOrdersDetail'

const deleteProductByIdUrl =
  'http://localhost:5000/api/deleteProductById'

const editProductUrl =
  'http://localhost:5000/api/editProduct'

//recording user search
const productSearchRecordUrl =
  'http://localhost:5000/api/productSearchRecord'
const addToCartRecordUrl =
  'http://localhost:5000/api/addToCartRecord'


const productVistRecordUrl =
  'http://localhost:5000/api/addVisits'

const savingAKUrl = 'http://localhost:5000/api/saveAccessKey'

const adminSignupUrl = 'http://localhost:5000/api/adminRegister'

//admin signup
export const admin_signup = (userName, email, password, accessKey)=>{
  return axios.post(adminSignupUrl , {
    userName: userName,
    email: email,
    password: password,
    accessKey: accessKey
  })
}




export const loginWithPhoneNumber = (phone,password)=>{
  return axios.post(loginWithPhoneUrl, {
    phone: phone,
    password: password
  })
}



// user log url
export const createUserLogs = (href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time) => 
  axios.post('http://localhost:5000/api/addUserLogs', {
    href : href,
    referrer : referrer, 
    screenWidth : screenWidth, 
    screenHeight : screenHeight, 
    addToCart : addToCart, 
    reachedCheckout : reachedCheckout, 
    purchased : purchased,
    date : date,
    time : time
  });

export const fetchUserLogs = () =>
  axios.post('http://localhost:5000/api/getUserLogs');  

export const fetchUserLogCounts = () =>
  axios.post('http://localhost:5000/api/getUserLogCount');  

// orders detail
export const fetchOrderReports = () =>
  axios.post(readOrderReportUrl);

// orders total
export const fetchOrderTotal = () =>
  axios.post(readOrderTotalUrl);

// orders
export const fetchOrderDetails = (id) =>
  axios.post(fetchOrderDetailsUrl, {
    id: id
  });

// orders
export const changeOrderStatus = (id, status) =>
  axios.post("http://localhost:5000/api/changeStatus", {
    id: id,
    status: status
});


export const createOrderDetails = (orderId, productId, price, productQuantity) => 
  axios.post(createOrderDetailsUrl, {
    orderId: orderId,
    productId: productId,
    price:price , 
    productQuantity: productQuantity
  });

// orders
export const fetchOrders = () =>
  axios.post(fetchOrdersUrl);
export const fetchOrdersInprogress = () =>
  axios.post("http://localhost:5000/api/getInprogressOrders");
export const fetchOrdersById = (id) =>
  axios.post(fetchOrdersByIdUrl, {id: id});
export const createOrders = (date, userId, total, lat,lng ,contact, cost, no_item) => 
  axios.post(createOrdersUrl, {
    date: date,
    userId: userId,
    total: total,
    latitude: lat,
    longitude: lng,
    contact: contact,
    cost: cost,
    no_item: no_item
  });

// users
export const fetchUsers = (email, password) =>
  axios.post(readUserUrl, {
      email: email,
      password: password
    }
  );
export const getAllUser = ()=>
    axios.post(getAllUserUrl)
// export const createUser = (user) => 
//   axios.post(createUserUrl, user);
export const createUserByPhoneNumber =(FirstName,LastName,phone,password)=>{
  axios.post(createUserByPhoneNumberUrl, {
    fname:FirstName,
    lname:LastName,
    phone: phone,
    password: password
    })
}

export const createUserByEmail =(FirstName,LastName,email,password)=>{
  axios.post('http://localhost:5000/api/addUserByEmail', {
    fname:FirstName,
    lname:LastName,
    email: email,
    password: password
    })
}

//fetch all categories 
export const fetchCategory = ()=> 
  axios.get(getAllCategoriesUrl)



// products
export const fetchProducts = () => 
  axios.get(readProductUrl);




export const fetchAllProducts = ()=>
    axios.get(readAllProductUrl);

export const fetchProductsByCategory = (catagory) =>
  axios.post(readProductByCategoryUrl, {
      category: catagory  
    }
  );
export const fetchProductsById = (id) =>
  axios.post(readProductByIdUrl, {
      id: id  
    }
  );
export const deleteProductById = (id) =>
  axios.post(deleteProductByIdUrl, {
      id: id  
    }
  );


export const fetchProductsBySearch = (name, category) =>
  axios.post(readProductBySearchUrl, {
      name: name,
      category: category
    });
export const createProduct = (newProduct) => 
  axios.post(addProducturl, newProduct);

export const editProduct = (editValues) =>
    axios.post(editProductUrl, editValues)


//recording search
export const productSearchRecord = (name,category)=>
    axios.post(productSearchRecordUrl , {
      name: name,
      category: category
    })
export const addToCartRecord = (id, qtyCounter)=>
    axios.post(addToCartRecordUrl , {
      id: id,
      quantity: qtyCounter

    })

//recording visit
export const productVisitRecord = (id)=>
    axios.post(productVistRecordUrl , {
      id: id
    })


// save email and access key for product manager
export const savingAK = (email , accessKey)=>
    axios.post(savingAKUrl, {
      email: email,
      AK: accessKey
    })

