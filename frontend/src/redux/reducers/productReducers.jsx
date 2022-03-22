import * as actionTypes from '../constants/productConstant';


export const getProductsReducer = (state = {products: [] }, action)=>{
    switch(action.type){
        case actionTypes.GET_PRODUCTS_REQUEST:
            return{
                loading: true,
                products: []
            }
        case actionTypes.GET_PRODUCTS_SUCCESS:
            return{
                loading:false,
                products: action.payload
            }  
        case actionTypes.GET_PRODUCTS_FAIL:
            return{
                loading:false,
                error: action.payload,
                products: []
            }
        case actionTypes.GET_PRODUCTS_BY_CATEGORY_REQUEST:
            return{
                loading: true,
                products: []
            }
        case actionTypes.GET_PRODUCTS_BY_CATEGORY_SUCCESS:
            return{
                loading:false,
                products: action.payload,
            }  
        case actionTypes.GET_PRODUCTS_BY_CATEGORY_FAIL:
            return{
                loading:false,
                // error: action.payload,
                products: []
            }
        case actionTypes.CREATE_PRODUCTS_REQUEST:
            return{
                loading: true,
            }
        case actionTypes.CREATE_PRODUCTS_SUCCESS:
            return [
                ...state, action.payload
            ];
        case actionTypes.CREATE_PRODUCTS_FAIL:
            return{
                loading:false,
                error: action.payload
            }
        default:
            return state;
    }
    
};

// export const getProductsDetailsReducer = (state = {product: {}}, action)=>{
//     switch(action.type){
//         case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
//             return{
//                 loading: true,
//             };
//         case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
//             return{
//                 loading:false,
//                 product: action.payload,
//             };
//         case actionTypes.GET_PRODUCT_DETAILS_FAIL:
//             return{
//                 loading:false,
//                 error: action.payload,
//             };
//         case actionTypes.GET_PRODUCT_DETAILS_RESET:
//             return{
//                 product: {},
//             };
//         default:
//             return state;
//     }
// }