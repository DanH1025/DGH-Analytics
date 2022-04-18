import './App.css';
// import {Switch,Router, BrowserRouter,Route} from 'react-router-dom'

import {Switch, Route, BrowserRouter} from 'react-router-dom'
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
      <BrowserRouter>
        <main>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signUp' component={SignUp} />
            {/* client side paths */}
             <Route exact path='/' component={Home} />
             <Route exact path='/cart' component={Cart} />
             <Route exact path='/wishlist' component={Wishlist} />
             <Route exact path='/checking' component={Checkout}/>
             <Route exact path='/search' component={SearchResult} />
             <Route exact path='/productDetails/:id' component={ProductDetails} />

            {/* product Manager paths */}
            <Route exact path='/productManagerDashboard' component={PM_Dashboard} />
            <Route exact path='/adminDash' component={Admin_Dashboard} />

          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
