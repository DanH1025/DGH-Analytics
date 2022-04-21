import './App.css';
// import {Switch,Router, BrowserRouter,Route} from 'react-router-dom'

import {Switch, Routes, Route, BrowserRouter} from 'react-router-dom'
import Home from './pages/Client/Home/home';
import About from './pages/Client/About/about'
import Cart from './pages/Client/Cart/cart';
import Wishlist from './pages/Client/Wishlist/wishlist';
import Checkout from './pages/Client/Checkout/checkout';
import ProductDetails from './pages/Client/ProductDetails/productDetails';
import SearchResult from './pages/Client/SearchResult/searchResult';
import Login from './pages/Client/Login/login'
import SignUp from './pages/Client/SignUp/signUp'

import { Provider } from 'react-redux'
import store from './redux/store';
import PM_Dashboard from './pages/ProductManager/dashboard/dashboard';

import Admin_Dashboard from './pages/Admin/dashboard/dashboard';


function App() {
  return (
    <Provider store={store}>
      
        <main>
          <Routes>
            {/* <Route exact path='/login' component={Login} /> */}
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signUp' element={<SignUp />} />
            <Route exact path='/' element={<Home />} />
             <Route exact path='/cart' element={<Cart />} />
             <Route exact path='/wishlist' element={<Wishlist />} />
             <Route exact path='/checking' element={<Checkout />}/>
             <Route exact path='/search' element={<SearchResult />} />
             <Route exact path='/productDetails/:id' element={<ProductDetails />} />

            {/* product Manager paths */}
            <Route exact path='/productManagerDashboard' element={<PM_Dashboard />} />
            <Route exact path='/adminDash' element={<Admin_Dashboard />} />

          </Routes>
        </main>
      
    </Provider>
  );
}

export default App;
