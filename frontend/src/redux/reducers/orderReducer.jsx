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
    case actionTypes.GET_ORDERS_INPROGRESS_REQUEST:
        return{
            loading: true,
            orders: []
        }
    case actionTypes.GET_ORDERS_INPROGRESS_SUCCESS:
        return{
            loading:false,
            orders: action.payload
        }  
    case actionTypes.GET_ORDERS_INPROGRESS_FAIL:
        return{
            loading:false,
            error: action.payload,
            // products: []
        }
    case actionTypes.GET_ORDERS_BY_ID_REQUEST:
        return{
            loading: true,
            orders: []
        }
    case actionTypes.GET_ORDERS_BY_ID_SUCCESS:
        return{
            loading:false,
            orders: action.payload
        }  
    case actionTypes.GET_ORDERS_BY_ID_FAIL:
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

export const getOrderReportsReducer = (state = {orderReports: []}, action)=>{
  switch(action.type){
    case actionTypes.GET_ORDER_REPORTS_REQUEST:
        return{
            loading: true,
            orderReports: []
        }
    case actionTypes.GET_ORDERS_REPORTS_SUCCESS:
        return{
            loading:false,
            orderReports: action.payload
        }  
    case actionTypes.GET_ORDERS_REPORTS_FAIL:
        return{
            loading:false,
            error: action.payload
        }
    default:
        return state;
  } 
};

export const getOrderTotalReducer = (state = {total: []}, action)=>{
  switch(action.type){
    case actionTypes.GET_ORDER_TOTALS_REQUEST:
        return{
            loading: true,
            total: []
        }
    case actionTypes.GET_ORDERS_TOTALS_SUCCESS:
        return{
            loading:false,
            total: action.payload
        }  
    case actionTypes.GET_ORDERS_TOTALS_FAIL:
        return{
            loading:false,
            error: action.payload
        }
    default:
        return state;
  } 
};
