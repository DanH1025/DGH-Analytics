import axios from 'axios';

const readProductUrl = 'http://localhost:5000/api/getAllProducts';
const addProducturl = 'http://localhost:5000/api/addToStock';
const readProductByCategoryUrl = 'http://localhost:5000/api/getProductsByCategory';
const readProductByIdUrl = 'http://localhost:5000/api/getProductsById';


export const fetchProducts = () => axios.get(readProductUrl);
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
export const createProduct = (newProduct) => axios.post(addProducturl, newProduct);
