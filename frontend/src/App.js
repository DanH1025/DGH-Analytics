import './App.css';
import {Switch, BrowserRouter,Route} from 'react-router-dom'
import Topbar from './components/topbar/topbar';
import ImageSlider from './components/imageSlider/imageSlider';
import { sliderData } from './components/imageSlider/sliderData';


function App() {
  return (
    <BrowserRouter>
      <Topbar />
     <ImageSlider className="imageSliderComponent" slides={sliderData} />
    
    </BrowserRouter>
  );
}

export default App;
