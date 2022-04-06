import React, { useEffect, useState } from 'react'
import './home.css'
import { Axios } from 'axios'
import Topbar from '../../../components/Client/topbar/topbar'
import ImageSlider from '../../../components/Client/imageSlider/imageSlider'
import FeaturedInfo from '../../../components/Client/featuredInfo/featuredInfo'
import ProductCard from '../../../components/Client/productCard/productCard'
import ContactUs from '../../../components/Client/contactUs/contactUs'
import Footer from '../../../components/Client/footer/footer'
import { sliderData } from '../../../components/Client/imageSlider/sliderData'

//import redux to use redux action and constants

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/actions/productActions';
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
	// console.log(products);


  const [productList, setProduct] = useState([]);

  return (
    <>
      <Topbar />
      {/* <ImageSlider 
        className="imageSliderComponent" 
        slides={sliderData} />
      <FeaturedInfo /> */}
      <div className='homeScreen_products'>
        
        <h3 productCardTitle>Our Products</h3>

        <div className="productHolder">
            {
              !products?.length ? <div></div> : (
                products.map((val, key) => {
                  // console.log(val);
                  return (
                    <div className='productListItems' >
                    
                      <ProductCard 
                        key = {val.id}
                        productId={val.id} // this id is not the product id should be the random generated number for the product id
                        name={val.productName}
                        price={val.productPrice}
                        imageUrl={val.productImg}
                        brand={val.productBrand} 
                        />

                    </div>
                    
                  )
                }) 
              )
            }
        </div>
      </div>
      {/* <ContactUs />
      <Footer /> */}
    </>
  )
}
