import './App.css';
import {Switch,Router, BrowserRouter,Route} from 'react-router-dom'

import Home from './pages/Home/home';
import About from './pages/About/about'
import AddProduct from './pages/AddProduct/addProduct';


function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
           <Route exact path='/' component={Home} />
           <Route exact path='/addToStock' component={AddProduct} />
        </Switch>
      </main>
      
                 
    </BrowserRouter>
  );
}

export default App;
