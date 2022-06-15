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

export const getOrdersInprogress = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDERS_INPROGRESS_REQUEST,
        });
        const {data} = await api.fetchOrdersInprogress();
        
        dispatch({
            type: actionType.GET_ORDERS_INPROGRESS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_INPROGRESS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const getOrdersPending = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDERS_PENDING_REQUEST,
        });
        const {data} = await api.fetchOrdersPending();
        
        dispatch({
            type: actionType.GET_ORDERS_PENDING_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_PENDING_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const getOrdersById = (id) => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDERS_BY_ID_REQUEST,
        });
        const {data} = await api.fetchOrdersById(id);
        
        dispatch({
            type: actionType.GET_ORDERS_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_BY_ID_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const changeOrderStatus = (id, status) => async (dispatch)=>{
    try {
        // dispatch({
        //     // type: actionType.GET_ORDERS_BY_ID_REQUEST,
        // });
        const {data} = await api.changeOrderStatus(id, status);
        
        // dispatch({
        //     type: actionType.GET_ORDERS_BY_ID_SUCCESS,
        //     payload: data,
        // });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_BY_ID_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const createOrders = (date, userId, total , lat, lng , contact, cost, no_item) => async (dispatch) => {
  console.log('action : ' + total);
	try{
    dispatch({
      type: actionType.CREATE_ORDERS_REQUEST,
    });
		const { data } = await  api.createOrders(date, userId, total, lat, lng ,contact, cost, no_item);
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