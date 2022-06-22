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
const addReviewUrl = 'http://localhost:5000/api/addComment'
const fetchCommentsUrl = 'http://localhost:5000/api/getComment'
const fetchFiveProductsUrl = 'http://localhost:5000/api/getTopProducts'
const fetchAdminUserNameUrl = 'http://localhost:5000/api/getAdminUserName'
const changeAdminNameUrl = 'http://localhost:5000/api/changeAdminUserName'
const changeAdminPasswordUrl = 'http://localhost:5000/api/changeAdminPassword'
const addAdminAccountUrl = 'http://localhost:5000/api/createAdminAccount'
const sellProductUrl = 'http://localhost:5000/api/sellProduct'
const returnProductUrl = 'http://localhost:5000/api/returnProduct'
const getOrderLocationUrl = 'http://localhost:5000/api/purchasedFrom'
//admin signup
export const admin_signup = (userName, email, password, accessKey)=>{
  return axios.post(adminSignupUrl , {
    userName: userName,
    email: email,
    password: password,
    accessKey: accessKey
  })
}

export const fetchOrderReportByYear = () =>{
  return axios.post('http://localhost:5000/api/getMonthYearOrderReport');
}

export const fetchOrderReportByMonth = (month) =>{
  return axios.post('http://localhost:5000/api/getMonthDayOrderReport', {
    month: month
  });
}

// order report
export const fetchWeeklyReport = () =>{
  return axios.post('http://localhost:5000/api/getWeekReport');
  
}


export const loginWithPhoneNumber = (phone,password)=>{
  return axios.post(loginWithPhoneUrl, {
    phone: phone,
    password: password
  })
}



// user log url
export const createUserLogs = (href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time, state, county, userId) => 
  axios.post('http://localhost:5000/api/addUserLogs', {
    href : href,
    referrer : referrer, 
    screenWidth : screenWidth, 
    screenHeight : screenHeight, 
    addToCart : addToCart, 
    reachedCheckout : reachedCheckout, 
    purchased : purchased,
    date : date,
    time : time,
    state: state,
    county: county,
    userId: userId
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

// orders
export const fetchOrdersPending = () =>
  axios.post("http://localhost:5000/api/getPendingOrders");


export const createCategory = (categoryName, categoryValue, categoryImg) => 
  axios.post("http://localhost:5000/api/addCategory", {
    categoryName: categoryName,
    categoryValue: categoryValue,
    categoryImg: categoryImg 
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
export const fetchOrdersComplete = () =>
  axios.post("http://localhost:5000/api/getCompleteOrders");
export const fetchOrdersById = (id) =>
  axios.post(fetchOrdersByIdUrl, {id: id});
export const fetchOrdersByDeliveryId = (id) =>
  axios.post("http://127.0.0.1:5000/api/getOrdersbyDeliveryId", {id: id});
export const fetchOrdersByDeliveryIdAndDate = (id, date) =>
  axios.post("http://127.0.0.1:5000/api/getOrdersbyDeliveryIdAndDate", {
    id: id,
    date: date
  });
export const fetchCompleteOrdersByDate = (date) =>
  axios.post("http://127.0.0.1:5000/api/getCompleteOrdersByDate", { date: date });

export const fetchOrdersbyIdDate = (id, date) =>
  axios.post("http://127.0.0.1:5000/api/getOrdersbyIdDate", {
    id: id,
    date: date
  });
  
export const createOrders = (date, userId, total, lat,lng ,contact, cost, no_item, address) => 
  axios.post(createOrdersUrl, {
    date: date,
    userId: userId,
    total: total,
    latitude: lat,
    longitude: lng,
    contact: contact,
    cost: cost,
    no_item: no_item,
    address: address
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
export const addToCartRecord = (id, qtyCounter, userId)=>
    axios.post(addToCartRecordUrl , {
      id: id,
      quantity: qtyCounter,
      userId: userId

    })

//recording visit
export const productVisitRecord = (id)=>
    axios.post(productVistRecordUrl , {
      id: id
    })


// save email and access key for product manager
export const savingAK = (email , accessKey, role)=>
    axios.post(savingAKUrl, {
      email: email,
      AK: accessKey,
      role: role
    })


//product review 
export const addReview = (text, userId, productId, productName )=>{
  axios.post( addReviewUrl,{
    message: text,
    userId: userId,
    productId: productId,
    productName: productName
  })
}

export const getComments = ()=>{
  axios.post(fetchCommentsUrl)
}

export const fetchFiveProducts = ()=>{
  return axios.post(fetchFiveProductsUrl)
}
export const fetchAdminUserName = (email)=>{
  return axios.post (fetchAdminUserNameUrl , {email:email})
}

export const changeAdminName = (email, userName) =>{
    axios.post(changeAdminNameUrl , {email, userName})
}

export const changeAdminPassword = (email, oldPassword , newPassword)=>{
   return axios.post (changeAdminPasswordUrl , {
    email:email,
    oldPassword:oldPassword,
    newPasswor: newPassword
   })
}

export const addAdminAccount =(userName  , email , password)=>{
  return axios.post(addAdminAccountUrl , {
    name: userName,
    email: email,
    password: password

  })
}

export const sellingProduct = (id, qty)=>{
  return axios.post(sellProductUrl , {
    id: id,
    qty: qty
  })
}

export const retruningProduct = (id, qty)=>{
  return axios.post(returnProductUrl , {
    id: id,
    qty: qty
  })
}

//get recent order location for a specific user
export const getOrderLocation = (userId) =>{
  return axios.post(getOrderLocationUrl, {
    id:userId
  })
}