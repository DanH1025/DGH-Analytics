import * as actionType from '../constants/userConstant';
import * as api from '../api/index';
import axios from 'axios';


export const getUserLog = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_USER_LOGS_REQUEST,
        });
        const {data} = await api.fetchUserLogs();
        console.log(data);
        dispatch({
            type: actionType.GET_USER_LOGS_SUCCESS,
            payload: data,
        }); 
    } catch (error) {
        dispatch({
            type:actionType.GET_USER_LOGS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const createUserLog = (href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time) => async (dispatch) => {
	try{
    dispatch({
      type: actionType.CREATE_USER_LOGS_REQUEST,
    });
		const { data } = await  api.createUserLogs(href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time);
		
		dispatch({ 
      type: actionType.CREATE_USER_LOGS_SUCCESS, 
      payload: data 
    });
	} catch (error) {
		dispatch({
      type:actionType.CREATE_USER_LOGS_FAIL,
      payload: 
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
      });
	}
};