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
import { createUserLog } from '../../../redux/actions/userLogActions';
//import redux actions to call all the functions
// import { getProducts as listProducts } from '../../redux/actions/productActions'


export default function Home() {
  
  window.onbeforeunload = function(){
    console.log('want to leave');
    setCook();
    // return 'Are you sure you want to leave?';
  };
  const setCook = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const date = new Date().toISOString().slice(0, 10);
    console.log(date);

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let purchased = false;
    let reachCheck = false;

    // localStorage.setItem("time leave", time);
    if (!localStorage.getItem("purchased") === null) {
      console.log('purchased found');
      purchased = sessionStorage.getItem('purchased');
    }else{
      console.log('purchased not found');
      purchased = false;
    }
    if (!localStorage.getItem("reachedCheckout") === null) {
      reachCheck = sessionStorage.getItem('reachedCheckout');
      console.log('userr found');
    }else{
      console.log('user not found');
      reachCheck = false;
    }

    dispatch(createUserLog(user.href,user.referrer,1156,856,true,reachCheck,purchased,date,time));

    sessionStorage.removeItem('user');
    sessionStorage.removeItem('reachedCheckout');
    sessionStorage.removeItem('purchased');
  }
  // const dispatch = useDispatch();
  // const getProducts = useSelector(state=>state.getProducts);

  // const {loading,products,error} = getProducts;

  const dispatch = useDispatch();

 	useEffect(() => {
 	  dispatch(getProducts());

    const user = { referrer : document.referrer,
      href: document.location.href,
      // screenWidth: screen.width,
      // screenHeight: screen.height,
      status: 'visit'
     };

    sessionStorage.setItem('user' , JSON.stringify(user));
    
 	}, [dispatch]);

	const products = useSelector((state) => state.getProduct.products);
	// console.log(products);


  const [productList, setProduct] = useState([]);

  return (
    <>
      <Topbar />
      <ImageSlider 
        className="imageSliderComponent" 
        slides={sliderData} />
      <FeaturedInfo />
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
      <ContactUs />
      <Footer />
    </>
  )
}
