import * as actionType from '../constants/categoryConstant';
import * as api from '../api/index';


export const getCagegory = () => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_CATEGORY_REQUEST,
        })
        const {data} = await api.fetchCategory();
        
        dispatch({
            type: actionType.GET_CATEGORY_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type:actionType.GET_CATEGORY_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }
}