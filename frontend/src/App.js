import './App.css';
import {Routes, BrowserRouter,Route} from 'react-router-dom'

import Home from './pages/Home/home';
import About from './pages/About/about'

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/about' component={About}/>
        </Routes>
      </main>
                 
    </BrowserRouter>
  );
}

export default App;
