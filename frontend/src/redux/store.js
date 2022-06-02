import { createStore, combineReducers , applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { getProductsReducer, getProductsDetailsReducer, getProductsSearchReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducer';
import { getUserReducer, getUserLogCount } from './reducers/userReducer';
import { getOrdersReducer, getOrderDetailsReducer, getOrderReportsReducer, getOrderTotalReducer, getOrderReportsByTimeReducer } from './reducers/orderReducer'
import { wishlistReducer } from './reducers/wishlistReducer';
import { loginReducer } from './reducers/loginReducer';
import { getCagegoryReducer } from './reducers/categoryReducers';
//import { commentReducer } from './reducers/productReducers';

const reducer = combineReducers({
  getProduct: getProductsReducer,
  getProductsDetail: getProductsDetailsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  getProductsSearch: getProductsSearchReducer,
  getUser: getUserReducer,
  // LoggedUser:loginReducer,
  getOrder: getOrdersReducer,
  userCount: getUserLogCount,
  getOrderDetail: getOrderDetailsReducer,
  getOrderReport: getOrderReportsReducer,
  getOrderTotal: getOrderTotalReducer,
  getCategory: getCagegoryReducer,
  userCount: getUserLogCount,
  orderReportsSpecific :getOrderReportsByTimeReducer
  // users: loginReducer
 // getComment: commentReducer,
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