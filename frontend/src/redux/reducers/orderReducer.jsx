import * as actionTypes from '../constants/orderConstant';

export const getOrdersReducer = (state = {orders: [] }, action)=>{
  switch(action.type){
    case actionTypes.GET_ORDERS_REQUEST:
        return{
            loading: true,
            orders: []
        }
    case actionTypes.GET_ORDERS_SUCCESS:
        return{
            loading:false,
            orders: action.payload
        }  
    case actionTypes.GET_ORDERS_FAIL:
        return{
            loading:false,
            error: action.payload,
            // products: []
        }
    case actionTypes.CREATE_ORDERS_REQUEST:
        return{
            loading: true,
        }
    case actionTypes.CREATE_ORDERS_SUCCESS:
        return [
            ...state, action.payload
        ];
    case actionTypes.CREATE_ORDERS_FAIL:
        return{
            loading:false,
            error: action.payload
        }
    default:
        return state;
  } 
};

export const getOrderDetailsReducer = (state = {orderDetails: [] }, action)=>{
  switch(action.type){
    case actionTypes.GET_ORDER_DETAILS_REQUEST:
        return{
            loading: true,
            orderDetails: []
        }
    case actionTypes.GET_ORDERS_DETAILS_SUCCESS:
        return{
            loading:false,
            orderDetails: action.payload
        }  
    case actionTypes.GET_ORDERS_DETAILS_FAIL:
        return{
            loading:false,
            error: action.payload,
            // products: []
        }
    case actionTypes.CREATE_ORDERS_DETAILS_REQUEST:
        return{
            loading: true,
        }
    case actionTypes.CREATE_ORDERS_DETAILS_SUCCESS:
        return [
            ...state, action.payload
        ];
    case actionTypes.CREATE_ORDERS_DETAILS_FAIL:
        return{
            loading:false,
            error: action.payload
        }
    default:
        return state;
  } 
};
