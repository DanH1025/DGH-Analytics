import React, { useEffect, useState } from 'react'
import './home.css'
import { Axios } from 'axios'
import Topbar from '../../components/topbar/topbar'
import ImageSlider from '../../components/imageSlider/imageSlider'
import FeaturedInfo from '../../components/featuredInfo/featuredInfo'
import ProductCard from '../../components/productCard/productCard'
import ContactUs from '../../components/contactUs/contactUs'
import Footer from '../../components/footer/footer'
import { sliderData } from '../../components/imageSlider/sliderData'

//import redux to use redux action and constants

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productActions';
//import redux actions to call all the functions
// import { getProducts as listProducts } from '../../redux/actions/productActions'




export default function Home() {
  // const dispatch = useDispatch();
  // const getProducts = useSelector(state=>state.getProducts);

  // const {loading,products,error} = getProducts;

  const dispatch = useDispatch();

 	useEffect(() => {
 	  dispatch(getProducts());
 	}, [dispatch]);

	const products = useSelector((state) => state.getProduct.products);
	console.log(products);


  const [productList, setProduct] = useState([]);

  return (
    <>
      <Topbar />
      <ImageSlider 
        className="imageSliderComponent" 
        slides={sliderData} />
      <FeaturedInfo />
      <div className='homeScreen_products'>
        {/* {console.log('in home'+ productList)}
        {console.log(products)} */}
        <h3 productCardTitle>Our Products</h3>

        <div className="productHolder">
            {
              !products.length ? <div></div> : (
                products.map((val, key) => {
                  console.log(val);
                  return (
                    <div className='items'>
                    
                      <ProductCard 
                        productId={val.id}
                        name={val.product_name}
                        price={val.product_price}
                        imageUrl={val.product_img}
                        brand={val.product_brand} 
                        />

                    </div>
                    
                  )
                }) 
              )
            }
        </div>
      </div>
      <ContactUs />
      <Footer />
    </>
  )
}
