import './App.css';
import {Switch,Router, BrowserRouter,Route} from 'react-router-dom'

import Home from './pages/Client/Home/home';
import About from './pages/Client/About/about'
import Cart from './pages/Client/Cart/cart';
import Checkout from './pages/Client/Checkout/checkout';
import ProductDetails from './pages/Client/ProductDetails/productDetails';
import SearchResult from './pages/Client/SearchResult/searchResult';

import { Provider } from 'react-redux'
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <main>
          <Switch>
             <Route exact path='/' component={Home} />
             <Route exact path='/cart' component={Cart} />
             <Route exact path='/checking' component={Checkout}/>
             <Route exact path='/productDetails/:id' component={ProductDetails} />
             <Route exact path='/search' component={SearchResult} />
          </Switch>
        </main>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
