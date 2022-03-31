import * as actionType from '../constants/productConstant';
import * as api from '../api/index';
import axios from 'axios';
import { Axios } from 'axios';


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

//get all the products for the admin to see
export const getAllProducts = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ALL_PRODUCTS_REQUEST,
        });
        const {data} = await api.fetchAllProducts();
        
        dispatch({
            type: actionType.GET_ALL_PRODUCTS_SUCCESS,
            payload: data,
        }); 
    } catch (error) {
        dispatch({
            type:actionType.GET_ALL_PRODUCTS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};



export const getProductsByCategory = (catagory) => async (dispatch)=>{
    console.log('in actioning: ' + catagory);
    try {
        dispatch({
            type: actionType.GET_PRODUCTS_BY_CATEGORY_REQUEST,
        });
        const {data} = await api.fetchProductsByCategory(catagory);
        
        dispatch({
            type: actionType.GET_PRODUCTS_BY_CATEGORY_SUCCESS,
            payload: data,
        }); 
    } catch (error) {
        dispatch({
            type:actionType.GET_PRODUCTS_BY_CATEGORY_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const getProductsById = (id) => async (dispatch)=>{
    console.log('in actioning: ' + id);
    try {
        dispatch({
            type: actionType.GET_PRODUCT_DETAILS_REQUEST,
        });
        const {data} = await api.fetchProductsById(id);
        
        dispatch({
            type: actionType.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data,
        }); 
    } catch (error) {
        dispatch({
            type:actionType.GET_PRODUCT_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
        dispatch({
            type:actionType.GET_PRODUCT_DETAILS_RESET,
        });
    }
};

//delete products 

export const deleteProductById = (id) => async (dispatch)=>{
    console.log('in deleting: ' + id);
    try {
        dispatch({
            type: actionType.PRODUCT_DELETE_REQUEST,
            
        });
        const {data} = await api.deleteProductById(id);
         
    } catch (error) {
        dispatch({
            type:actionType.PRODUCT_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
        dispatch({
            type:actionType.GET_PRODUCT_DETAILS_RESET,
        });
    }
};

export const editProduct = (editValues) => async (dispatch)=>{
    console.log("im edting action");
    try {
        dispatch({
            type: actionType.PRODUCT_EDIT_REQUEST,
        })
        const {data} = await api.editProduct(editValues);
        
        dispatch({
            type: actionType.PRODUCT_EDIT_SUCCESS,
            loading:false
        }); 

    } catch (error) {
        dispatch({
            type:actionType.PRODUCT_DELETE_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
}


export const getProductsBySearch = (name, category) => async (dispatch)=>{
    // console.log('in actioning: ' + id);
    try {
        dispatch({
            type: actionType.GET_PRODUCTS_BY_SEARCH_REQUEST,
        });
        const {data} = await api.fetchProductsBySearch(name, category);
        
        dispatch({
            type: actionType.GET_PRODUCTS_BY_SEARCH_SUCCESS,
            payload: data,
        }); 
    } catch (error) {
        dispatch({
            type:actionType.GET_PRODUCTS_BY_SEARCH_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

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







// export const createProduct = (product) => async (dispatch) => {
// 	try{
//         dispatch({
//             type: actionType.CREATE_PRODUCTS_REQUEST,
//         });
// 		const { data } = await  api.createProduct(product);
		
// 		dispatch({ 
//             type: actionType.CREATE_PRODUCTS_SUCCESS, 
//             payload: data 
//         });
// 	} catch (error) {
// 		dispatch({
//             type:actionType.CREATE_PRODUCTS_FAIL,
//             payload: 
//                 error.response && error.response.data.message 
//                 ?error.response.data.message:error.message,
//         });
// 	}
// };




// export const removeProductDetails = ()=> (dispatch)=>{
//     dispatch({
//         type:actionType.GET_PRODUCT_DETAILS_RESET,
//     });
// };

























