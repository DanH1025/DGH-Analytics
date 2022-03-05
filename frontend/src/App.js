import './App.css';
import {Switch, BrowserRouter,Route} from 'react-router-dom'

import Home from './pages/Home/home';
import About from './pages/About/about'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About}/>
        </Switch>
      </main>
              
     
    
    </BrowserRouter>
  );
}

export default App;
