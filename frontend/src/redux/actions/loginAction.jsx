import * as actionType from '../constants/loginConstants';
import * as api from '../api/index';



export const loginWithPhone = (phone, password) => async(dispatch)=>{
    try {
        dispatch({
            type: actionType.LOGIN_WITH_PHONE_REQUEST,
        })
        const { data } = await api.loginWithPhoneNumber(phone,password);
        dispatch({
            type: actionType.LOGIN_WITH_PHONE_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: actionType.LOGIN_WITH_PHONE_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
            });
    }
}