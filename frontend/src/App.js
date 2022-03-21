import './App.css';
import {Switch,Router, BrowserRouter,Route} from 'react-router-dom'

import Home from './pages/Home/home';
import About from './pages/About/about'
import AddProduct from './pages/AddProduct/addProduct';
import Cart from './pages/Cart/cart';
import Checkout from './pages/Checkout/checkout';


function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
           <Route exact path='/' component={Home} />
           <Route exact path='/addToStock' component={AddProduct} />
           <Route exact path='/cart' component={Cart} />
           <Route exact path='/checking' component={Checkout}/>
        </Switch>
      </main>
      
                 
    </BrowserRouter>
  );
}

export default App;
