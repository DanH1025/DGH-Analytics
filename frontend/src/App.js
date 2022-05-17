import './App.css';
// import {Switch,Router, BrowserRouter,Route} from 'react-router-dom'
import {useEffect, useState} from 'react';
import { Routes, Route, BrowserRouter , Navigate } from 'react-router-dom'
import Home from './pages/Client/Home/home';
import About from './pages/Client/About/about'
import Cart from './pages/Client/Cart/cart';
import Wishlist from './pages/Client/Wishlist/wishlist';
import Checkout from './pages/Client/Checkout/checkout';
import ProductDetails from './pages/Client/ProductDetails/productDetails';
import SearchResult from './pages/Client/SearchResult/searchResult';
import Login from './pages/Client/Login/login'
import SignUp from './pages/Client/SignUp/signUp'
import Topbar from './components/Client/topbar/topbar'

import axios from 'axios';

import { Provider } from 'react-redux';
import store from './redux/store';
import PM_Dashboard from './pages/ProductManager/dashboard/dashboard';
import Admin_Dashboard from './pages/Admin/dashboard/dashboard';
import AdminLogin from './pages/Admin/AdminLogin/adminLogin'

function App() {
    const [user, setUser] = useState(null)

    // useEffect(()=>{
   
    //   const getUser = async () =>{    

     
    //     fetch('http://localhost:5000/auth/login/success'
    //       ,{
    //       method: "GET",
    //       credentials: "include",
    //       headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Credentials": "*",
    //      },
    //     }
    //     )
    //     .then((response)=>{
    //       if(response.status === 200) return response.json();
    //       throw new Error("Authentication has Failed")
    //     })
    //      .then((resObject)=>{
    //        setUser(resObject.user)
    //     })
    //     .catch((err)=>{
    //       console.log(err)
    //     })
    //    };
    //   getUser();
    // },[]);

    console.log(user);

  return (    
    <Provider store={store}>
       {/* <Topbar /> */}
        <main>
          <Routes>
            {/* <Route exact path='/login' component={Login} /> */}
            <Route exact path='/login' element={ user? <Navigate to='/' /> : <Login />} />
            <Route exact path='/signUp' element={<SignUp />} />
            <Route exact path='/' element={<Home />} />
             <Route exact path='/cart' element={<Cart />} />
             <Route exact path='/wishlist' element={<Wishlist />} />
             <Route exact path='/checking' element={<Checkout />}/>
             <Route exact path='/search' element={<SearchResult />} />
             <Route exact path='/productDetails/:id' element={<ProductDetails />} />

            {/* product Manager paths */}
            <Route exact path='/adminstrationLogin' element={<AdminLogin />} />
            <Route exact path='/productManagerDashboard' element={<PM_Dashboard />} />
            <Route exact path='/adminDash' element={<Admin_Dashboard />} />

          </Routes>
        </main>
      
    </Provider>
  );
}

export default App;
