import * as actionType from '../constants/orderConstant';
import * as api from '../api/index';
import axios from 'axios';


export const getOrderDetails = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDER_DETAILS_REQUEST,
        });
        const {data} = await api.fetchOrderDetails();
        
        dispatch({
            type: actionType.GET_ORDERS_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_DETAILS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const createOrderDetails = (orderId, productId, productQuantity) => async (dispatch) => {
  console.log('action order Detail action : ' + productId);
	try{
    dispatch({
      type: actionType.CREATE_ORDERS_DETAILS_REQUEST,
    });
		const { data } = await api.createOrderDetails(orderId, productId, productQuantity);
		dispatch({ 
      type: actionType.CREATE_ORDERS_DETAILS_SUCCESS, 
      payload: data 
    });
	} catch (error) {
		dispatch({
      type:actionType.CREATE_ORDERS_DETAILS_FAIL,
      payload: 
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
      });
	}
};