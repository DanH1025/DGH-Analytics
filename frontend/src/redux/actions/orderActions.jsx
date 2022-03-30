import * as actionType from '../constants/orderConstant';
import * as api from '../api/index';
import axios from 'axios';


export const getOrders = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDERS_REQUEST,
        });
        const {data} = await api.fetchOrders();
        
        dispatch({
            type: actionType.GET_ORDERS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const createOrders = (date, userId, total) => async (dispatch) => {
  console.log('action : ' + total);
	try{
    dispatch({
      type: actionType.CREATE_ORDERS_REQUEST,
    });
		const { data } = await  api.createOrders(date, userId, total);
		dispatch({ 
      type: actionType.CREATE_ORDERS_SUCCESS, 
      payload: data 
    });
	} catch (error) {
		dispatch({
      type:actionType.CREATE_ORDERS_FAIL,
      payload: 
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
      });
	}
};