import './App.css';
import {Switch, BrowserRouter,Route} from 'react-router-dom'
import Topbar from './components/topbar/topbar';

function App() {
  return (
    <BrowserRouter>
      <Topbar />
    
    </BrowserRouter>
  );
}

export default App;
