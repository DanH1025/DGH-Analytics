import './App.css';
// import {Switch,Router, BrowserRouter,Route} from 'react-router-dom'
import {useEffect, useState} from 'react';
import { Routes, Route, BrowserRouter , Navigate } from 'react-router-dom'
import Home from './pages/Client/Home/home';
import About from './pages/Client/About/about'
import Contact from './pages/Client/Contact/contact'
import Cart from './pages/Client/Cart/cart';
import Wishlist from './pages/Client/Wishlist/wishlist';
import Orderlist from './pages/Client/Orderlist/orderlist';
import Checkout from './pages/Client/Checkout/checkout';
import ProductDetails from './pages/Client/ProductDetails/productDetails';
import SearchResult from './pages/Client/SearchResult/searchResult';
import Login from './pages/Client/Login/login'
import SignUp from './pages/Client/Login/login'
import Topbar from './components/Client/topbar/topbar'

import axios from 'axios';

import { Provider } from 'react-redux';
import store from './redux/store';
import PM_Dashboard from './pages/ProductManager/dashboard/dashboard';
import Admin_Dashboard from './pages/Admin/dashboard/dashboard';
import Delivery_Dashboard from './pages/Delivery/DeliveryDash/deliveryDash';
import AdminLogin from './pages/Admin/AdminLogin/adminLogin'



import RequireAuth from './components/Admin/RequireAuth';
import UserAuth from './components/Admin/UserAuth'


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
            <Route exact path='/orderlist' element={<Orderlist />} />
            <Route exact path='/search' element={<SearchResult />} />
            <Route exact path='/productDetails/:id' element={<ProductDetails />} />
            <Route exact path='/about' element={<About/>} />
            <Route exact path={'/contactUs'} element={<Contact />} />

            <Route element={<UserAuth />}>
              <Route exact path='/checking' element={<Checkout />}/>
            </Route>
            
            <Route element={<RequireAuth allowedRoles={'admin'}/>}>
              {/* admin path */}
              <Route exact path='/adminDash' element={<Admin_Dashboard />} />
            </Route>
            
            <Route element={<RequireAuth allowedRoles={'manager'}/>}>
              <Route exact path='/productManagerDashboard' element={<PM_Dashboard />} />
            </Route>
            
            <Route element={<RequireAuth allowedRoles={'delivery'}/>}>
              <Route exact path='/deliveryDashboard' element={<Delivery_Dashboard />} />
            </Route>

             
            <Route exact path='/adminstrationLogin' element={<AdminLogin />} />


          </Routes>
        </main>
      
    </Provider>
  );
}

export default App;
