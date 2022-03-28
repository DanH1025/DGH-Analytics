import * as actionType from '../constants/userConstant';
import * as api from '../api/index';
import axios from 'axios';


export const getUser = (email, password) => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_USER_REQUEST,
        });
        const {data} = await api.fetchUsers(email, password);
        
        dispatch({
            type: actionType.GET_USER_SUCCESS,
            payload: data,
        }); 
    } catch (error) {
        dispatch({
            type:actionType.GET_USER_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};

export const createUser = (user) => async (dispatch) => {
	try{
    dispatch({
      type: actionType.CREATE_USER_REQUEST,
    });
		const { data } = await  api.createUser(user);
		
		dispatch({ 
      type: actionType.CREATE_USER_SUCCESS, 
      payload: data 
    });
	} catch (error) {
		dispatch({
      type:actionType.CREATE_USER_FAIL,
      payload: 
        error.response && error.response.data.message 
        ?error.response.data.message:error.message,
      });
	}
};