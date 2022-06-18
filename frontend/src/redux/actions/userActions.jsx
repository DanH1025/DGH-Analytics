import * as actionType from '../constants/userConstant';
import * as api from '../api/index';
import axios from 'axios';

export const getAdminUserName = (email) => async (dispatch) =>{
    try {
        dispatch({
            type: actionType.GET_ADMIN_NAME_REQUEST,
        })
        const {data} = await api.fetchAdminUserName(email);
        dispatch({
            type: actionType.GET_ADMIN_NAME_SUCCESS,
            payload: data
        })
        
        
    } catch (error) {
        dispatch({
            type: actionType.GET_ADMIN_NAME_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
            });
    }
}

export const changeAdminUserName = (email , userName) => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.CHANGE_ADMIN_USERNAME,
        })

        api.changeAdminName(email,userName);
        
        dispatch({
            type: actionType.CHANGE_ADMIN_USERNAME_SUCCESS,      
        })
        
    } catch (error) {
        dispatch({
            type: actionType.CHANGE_ADMIN_USERNAME_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
            });
    }
}


export const changeAdminPassword = (email , oldPassword , newPassword) => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.CHANGE_ADMIN_PASSWORD,
        })

         api.changeAdminPassword(email, oldPassword, newPassword);
        
        dispatch({
            type: actionType.CHANGE_ADMIN_PASSWORD_SUCCESS,      
        })
        
    } catch (error) {
        dispatch({
            type: actionType.CHANGE_ADMIN_PASSWORD_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
            });
    }
}

export const createAdminAccount = (userName, email , password)=> async (dispatch)=>{
    try {
        dispatch({
            type: actionType.CREATE_ADMIN_ACCOUNT,
        })
        const {data} = await api.addAdminAccount(userName, email , password);
        dispatch({
            type: actionType.CREATE_ADMIN_ACCOUNT_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: actionType.CREATE_ADMIN_ACCOUNT_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
            });
    }
}




export const saveAccessKey = (email, accessKey, role) => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.SAVING_ACCESS_KEY_REQUEST,
        })
        const {data} = await api.savingAK(email,accessKey, role);
        dispatch({
            type: actionType.SAVING_ACCESS_KEY_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: actionType.SAVING_ACCESS_KEY_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
            });
    }
}


// export const getUser = (email, password) => async (dispatch)=>{
//     try {
//         dispatch({
//             type: actionType.GET_USER_REQUEST,
//         });
//         const {data} = await api.fetchUsers(email, password);
//         console.log(data);
//         dispatch({
//             type: actionType.GET_USER_SUCCESS,
//             payload: data,
//         }); 
//     } catch (error) {
//         dispatch({
//             type:actionType.GET_USER_FAIL,
//             payload: 
//                 error.response && error.response.data.message 
//                 ?error.response.data.message:error.message,
//         });
//     }
// };

// export const createUser = (user) => async (dispatch) => {
// 	try{
//     dispatch({
//       type: actionType.CREATE_USER_REQUEST,
//     });
// 		const { data } = await  api.createUser(user);
		
// 		dispatch({ 
//       type: actionType.CREATE_USER_SUCCESS, 
//       payload: data 
//     });
// 	} catch (error) {
// 		dispatch({
//       type:actionType.CREATE_USER_FAIL,
//       payload: 
//         error.response && error.response.data.message 
//         ?error.response.data.message:error.message,
//       });
// 	}
// };


export const getAllUser = () => async(dispatch)=>{
    try {
        dispatch({
            type: actionType.GET_ALL_USER_REQUEST,
        })
        const {data} = await api.getAllUser();
        dispatch({
            type: actionType.GET_ALL_USER_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: actionType.GET_ALL_USER_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
            });
    }
}
export const createUserByPhone = (FirstName,LastName,phone,password) => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.CREATE_USER_BY_PHONE_REQUEST,
        });
         api.createUserByPhoneNumber(FirstName,LastName,phone,password);

        dispatch({
            type: actionType.CREATE_USER_BY_PHONE_SUCCESS,    
            // payload: data        
        });

        
    } catch (error) {
        dispatch({
        type: actionType.CREATE_USER_BY_PHONE_FAIL,
        payload: 
            error.response && error.response.data.message 
            ?error.response.data.message:error.message,
        });
    }
}

export const createUserByEmail = (FirstName,LastName,email,password) => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.CREATE_USER_BY_EMAIL_REQUEST,
        });
         api.createUserByEmail(FirstName,LastName,email,password);

        dispatch({
            type: actionType.CREATE_USER_BY_EMAIL_SUCCESS,    
            // payload: data        
        });

        
    } catch (error) {
        dispatch({
        type: actionType.CREATE_USER_BY_EMAIL_FAIL,
        payload: 
            error.response && error.response.data.message 
            ?error.response.data.message:error.message,
        });
    }
}

export const loginWithPhone = (phone, password) => async (dispatch) => {
    try {
        dispatch({
            type: actionType.LOGIN_WITH_PHONE_REQUEST,
        })
        console.log('in action login');
        const {data} = await api.loginWithPhoneNumber(phone,password);
        
        console.log(data);

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
