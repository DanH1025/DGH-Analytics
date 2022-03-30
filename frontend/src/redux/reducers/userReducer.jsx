import * as actionTypes from '../constants/userConstant';


export const getUserReducer = (state = {user: [] }, action)=>{
    switch(action.type){
        case actionTypes.GET_USER_REQUEST:
            return{
                loading: true,
                user: []
            }
        case actionTypes.GET_USER_SUCCESS:
            return{
                loading:false,
                user: action.payload
            }  
        case actionTypes.GET_USER_FAIL:
            return{
                loading:false,
                error: action.payload,
                // products: []
            }
        case actionTypes.CREATE_USER_REQUEST:
            return{
                loading: true,
            }
        case actionTypes.CREATE_USER_SUCCESS:
            return [
                ...state, action.payload
            ];
        case actionTypes.CREATE_USER_FAIL:
            return{
                loading:false,
                error: action.payload
            }
        default:
            return state;
    }
    
};