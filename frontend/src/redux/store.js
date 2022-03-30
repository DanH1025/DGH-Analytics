import { createStore, combineReducers , applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { getProductsReducer, getProductsDetailsReducer, getProductsSearchReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer';
import { getUserReducer } from './reducers/userReducer';
import { getOrdersReducer, getOrderDetailsReducer } from './reducers/orderReducer'


const reducer = combineReducers({
  getProduct: getProductsReducer,
  getProductsDetail: getProductsDetailsReducer,
  cart: cartReducer,
  getProductsSearch: getProductsSearchReducer,
  getUser: getUserReducer,
  getOrder: getOrdersReducer,
  getOrderDetail: getOrderDetailsReducer
})

const middleware = [thunk];


const cartFromLocalStorage = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []

const INITIAL_STATE={
  cart:{
    cartItems: cartFromLocalStorage
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