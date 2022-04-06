import { createStore, combineReducers , applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { getProductsReducer, getProductsDetailsReducer, getProductsSearchReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer';
import { getUserReducer } from './reducers/userReducer';
import { getOrdersReducer, getOrderDetailsReducer } from './reducers/orderReducer'
import { wishlistReducer } from './reducers/wishlistReducer';


const reducer = combineReducers({
  getProduct: getProductsReducer,
  getProductsDetail: getProductsDetailsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  getProductsSearch: getProductsSearchReducer,
  getUser: getUserReducer,
  getOrder: getOrdersReducer,
  getOrderDetail: getOrderDetailsReducer
})

const middleware = [thunk];


const cartFromLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
const wishlistFromLocalStorage = localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : []

const INITIAL_STATE={
  cart:{
    cartItems: cartFromLocalStorage
  },
  wishlist:{
    wishlistItems: wishlistFromLocalStorage
  }
}


const store = createStore(
  reducer,
  INITIAL_STATE,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;