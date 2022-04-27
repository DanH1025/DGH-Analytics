import axios from 'axios';

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
      'http://localhost:5000/api/loginWithPhone'

// order report of last week
const readOrderReportUrl = 
  'http://localhost:5000/api/getLastWeekOrderReport'
 // today total order
const readOrderTotalUrl = 
    'http://localhost:5000/api/getTotal'
  
// orders url
const fetchOrdersUrl = 
  'http://localhost:5000/api/getOrders'
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
export const createOrders = (date, userId, total, lat,lng ,contact) => 
  axios.post(createOrdersUrl, {
    date: date,
    userId: userId,
    total: total,
    latitude: lat,
    longitude: lng,
    contact: contact
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

export const loginWithPhoneNumber = (phone,password)=>{
  axios.post(loginWithPhoneUrl , {
      phone: phone,
      password: password
     })
}

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
