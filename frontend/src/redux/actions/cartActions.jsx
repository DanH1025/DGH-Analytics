import * as actionType from '../constants/cartConstant';
import axios from 'axios';
import * as api from '../api/index';


export const addToCart =  (id,qtyCounter) => async (dispatch,getState)=>{
    
    const {data} = await api.fetchProductsById(id);
    console.log("comming from  add to cart action");
    console.log(data);
    console.log(qtyCounter ," is the ammount being added to cart");
    console.log(data[0].productBrand);
    
    dispatch({
        type: actionType.ADD_TO_CART,
        payload:{
            product:data[0].id,
            productName:data[0].productName,
            imageUrl:data[0].productImg,
            price:data[0].productPrice,
            brand:data[0].productBrand,
            countInStock: data[0].countInStock,
            qtyCounter,
        },
    });
   
    //store the cartItem in the localstorage to save in case of refreshed page or changed tab screen
    localStorage.setItem('cart' , JSON.stringify(getState().cart.cartItems));
    // localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
};

export const addToCartRecord = (id, qtyCounter , userId) => async (dispatch)=>{
    try {
        dispatch({
            type: actionType.RECORD_ADD_TO_CART,
        })

        await api.addToCartRecord(id, qtyCounter, userId);

        
    } catch (error) {
        dispatch({
            type:actionType.RECORD_ADD_TO_CART_FAIL,
            payload: 
                error.response && error.response.data.message 
                ?error.response.data.message:error.message,
        });
    }

}


export const removeFromCart = (id) => (dispatch,getState) =>{
    dispatch({
        type: actionType.REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cart' , JSON.stringify(getState().cart.cartItems));
};


export const  clearCart = ()=> (dispatch , getState)=>{
    dispatch({
        type: actionType.CART_RESET,

    })
    localStorage.setItem('cart' , JSON.stringify(getState().cart.cartItems));
}
