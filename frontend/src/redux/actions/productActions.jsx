import * as actionType from '../constants/productConstant';
import * as api from '../api/index';
import axios from 'axios';


export const getProducts = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_PRODUCTS_REQUEST,
        });
        const {data} = await api.fetchProducts();
        
        dispatch({
            type: actionType.GET_PRODUCTS_SUCCESS,
            payload: data,
        }); 
    } catch (error) {
        dispatch({
            type:actionType.GET_PRODUCTS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

// export const getProductsDetails = (id) => async (dispatch)=>{
//     try {
//         dispatch({
//             type: actionType.GET_PRODUCT_DETAILS_REQUEST,
//         });
//         const {data} = await axios.get(`/api/getProductDetail/${id}`);
        
//         dispatch({
//             type: actionType.GET_PRODUCT_DETAILS_SUCCESS,
//             payload: data,
//         });
          
    
//     } catch (error) {
//         dispatch({
//             type:actionType.GET_PRODUCTS_FAIL,
//             payload: 
//                 error.response && error.response.data.message 
//                 ?error.response.data.message:error.message,
//         });
        
//     }
// };







export const createProduct = (product) => async (dispatch) => {
	try{
        dispatch({
            type: actionType.CREATE_PRODUCTS_REQUEST,
        });
		const { data } = await  api.createProduct(product);
		
		dispatch({ 
            type: actionType.CREATE_PRODUCTS_SUCCESS, 
            payload: data 
        });
	} catch (error) {
		dispatch({
            type:actionType.CREATE_PRODUCTS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
	}
};




// export const removeProductDetails = ()=> (dispatch)=>{
//     dispatch({
//         type:actionType.GET_PRODUCT_DETAILS_RESET,
//     });
// };

























