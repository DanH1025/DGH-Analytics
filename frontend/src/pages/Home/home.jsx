import React, { useEffect, useState } from 'react'
import './home.css'

import Topbar from '../../components/topbar/topbar'
import ImageSlider from '../../components/imageSlider/imageSlider'
import FeaturedInfo from '../../components/featuredInfo/featuredInfo'
import ProductCard from '../../components/productCard/productCard'
import ContactUs from '../../components/contactUs/contactUs'
import Footer from '../../components/footer/footer'
import { sliderData } from '../../components/imageSlider/sliderData'

//import redux to use redux action and constants
import { useSelector,useDispatch } from 'react-redux';

//import redux actions to call all the functions
import { getProducts as listProducts } from '../../redux/actions/productActions'
import Axios from 'axios';



export default function Home() {
  // const dispatch = useDispatch();
  // const getProducts = useSelector(state=>state.getProducts);

  // const {loading,products,error} = getProducts;

  const [productList, setProduct] = useState([]);

  useEffect(()=>{
    Axios.get('http://localhost:5000/api/getAllProducts').then((product) => {
      const prodcu = product.data;
      console.log('in ordo');
      console.log(prodcu);
      setProduct(product.data);
      console.log('in state:');
      console.log(productList);
    })
  }, [])

  return (
    <>
        <Topbar />
        <ImageSlider className="imageSliderComponent" slides={sliderData} />
        <FeaturedInfo />
        <div className='homeScreen_products'>
        {/* {loading? <h3>Loading ...</h3>: error? <h3>{error}</h3>: products.map(product =>(
        ))} */}
        {console.log('in home'+ productList)}
        {productList.map((product) => { 
          <div>
            <h1>some thing please</h1>
          </div>
          console.log('product' + product.productName);
          <ProductCard className="productList"
            key={product.id}
            productId={product.id}
            name={product.productName}
            price={product.productPrice}
            imageUrl={product.productImg}
            brand={product.productBrand}          
            />
        })}

        </div>
        <ContactUs />
        <Footer />
    </>
  )
}
