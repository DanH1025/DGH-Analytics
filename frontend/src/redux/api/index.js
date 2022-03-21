import axios from 'axios';

const readProductUrl = 'http://localhost:5000/api/getAllProducts';
const addProducturl = 'http://localhost:5000/api/addToStock';


export const fetchProducts = () => axios.get(readProductUrl);
export const createProduct = (newProduct) => axios.post(addProducturl, newProduct);
