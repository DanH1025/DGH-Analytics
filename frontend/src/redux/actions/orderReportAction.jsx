import * as actionType from '../constants/orderConstant';
import * as api from '../api/index';
import axios from 'axios';


export const getOrderReports = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ORDER_REPORTS_REQUEST,
        });
        const {data} = await api.fetchOrderReports();
        
        dispatch({
            type: actionType.GET_ORDERS_REPORTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:actionType.GET_ORDERS_REPORTS_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
};