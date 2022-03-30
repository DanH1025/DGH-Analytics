import axios from 'axios';

const readProductUrl = 
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
const createUserUrl = 
  'http://localhost:5000/api/addUser'

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


// orders
export const fetchOrderDetails = () =>
  axios.post(fetchOrderDetailsUrl);
export const createOrderDetails = (orderId, productId, productQuantity) => 
  axios.post(createOrderDetailsUrl, {
    orderId: orderId,
    productId: productId,
    productQuantity: productQuantity
  });

// orders
export const fetchOrders = () =>
  axios.post(fetchOrdersUrl);
export const createOrders = (date, userId, total) => 
  axios.post(createOrdersUrl, {
    date: date,
    userId: userId,
    total: total
  });

// users
export const fetchUsers = (email, password) =>
  axios.post(readUserUrl, {
      email: email,
      password: password
    }
  );
export const createUser = (user) => 
  axios.post(createUserUrl, user);

// products
export const fetchProducts = () => 
  axios.get(readProductUrl);
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
export const fetchProductsBySearch = (name, category) =>
  axios.post(readProductBySearchUrl, {
      name: name,
      category: category
    }
  );
export const createProduct = (newProduct) => 
  axios.post(addProducturl, newProduct);
