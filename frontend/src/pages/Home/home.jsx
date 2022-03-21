import React, { useEffect } from 'react'
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




export default function Home() {
  // const dispatch = useDispatch();
  // const getProducts = useSelector(state=>state.getProducts);

  // const {loading,products,error} = getProducts;

  // useEffect(()=>{
  //   dispatch(listProducts())
  // },[dispatch])


  return (
    <>
        <Topbar />
        <ImageSlider className="imageSliderComponent" slides={sliderData} />
        <FeaturedInfo />
        <div className='homeScreen_products'>
        {/* {loading? <h3>Loading ...</h3>: error? <h3>{error}</h3>: products.map(product =>(
          
          

        ))} */}

<ProductCard className="productList"
            // key={product.id}
            // productId={product.productID}
            // name={product.product_name}
            // price={product.product_price}
            // imageUrl={product.product_img}
            // brand={product.product_brand}          
          
          /> 

        </div>
        <ContactUs />
        <Footer />
    </>
  )
}
