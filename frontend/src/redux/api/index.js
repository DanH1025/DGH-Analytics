import axios from 'axios';

const readProductUrl = 'http://localhost:5000/api/getAllProducts';
const addProducturl = 'http://localhost:5000/api/addToStock';
const readProductByCategoryUrl = 'http://localhost:5000/api/getProductsByCategory';


export const fetchProducts = () => axios.get(readProductUrl);
export const fetchProductsByCategory = (catagory) =>
  axios.post(readProductByCategoryUrl, {
      category: catagory  
    }
  );

export const createProduct = (newProduct) => axios.post(addProducturl, newProduct);
