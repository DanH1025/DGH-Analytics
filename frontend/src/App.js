import './App.css';
import {Switch, BrowserRouter,Route} from 'react-router-dom'
import Topbar from './components/topbar/topbar';
import ImageSlider from './components/imageSlider/imageSlider';
import { sliderData } from './components/imageSlider/sliderData';
import FeaturedInfo from './components/featuredInfo/featuredInfo';
import ProductCard from './components/productCard/productCard';


function App() {
  return (
    <BrowserRouter>
     <Topbar />
     <ImageSlider className="imageSliderComponent" slides={sliderData} />
     <FeaturedInfo />
     <ProductCard className="productList" />
    
    </BrowserRouter>
  );
}

export default App;
