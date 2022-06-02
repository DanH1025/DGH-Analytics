import React, { useEffect, useState } from 'react'
import './home.css'
import { Axios } from 'axios'
import Topbar from '../../../components/Client/topbar/topbar'
import ImageSlider from '../../../components/Client/imageSlider/imageSlider'
import FeaturedInfo from '../../../components/Client/featuredInfo/featuredInfo'
import ProductCard from '../../../components/Client/productCard/productCard'
import ContactUs from '../../../components/Client/contactUs/contactUs'
import Footer from '../../../components/Client/footer/footer'
import CategoryCard from '../../../components/Client/categoryCard/categoryCard'
import { sliderData } from '../../../components/Client/imageSlider/sliderData'

//import redux to use redux action and constants

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/actions/productActions';
import { getCagegory } from '../../../redux/actions/categoryActions'
import { createUserLog } from '../../../redux/actions/userLogActions';
//import redux actions to call all the functions
// import { getProducts as listProducts } from '../../redux/actions/productActions'
import { useCookies } from 'react-cookie';

import StarsSharpIcon from '@material-ui/icons/StarsSharp';

export default function Home() {
  const [cookies, setCookie] = useCookies(['user']);
  window.onbeforeunload = function(){
    console.log('want to leave');
    setCook();
    //return 'Are you sure you want to leave?';
  };

  const setCook = () => {
    const user = JSON.parse(sessionStorage.getItem('loc'));
    const date = new Date().toISOString().slice(0, 10);
    console.log(date);

    localStorage.setItem('user leave', JSON.stringify(user));

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let purchased = sessionStorage.getItem('purchased');
    let reachCheck = sessionStorage.getItem ("reachedCheckout");

    if(purchased === null){
      purchased = false;
    }else{
      purchased = true;
    }
    if(reachCheck === null){
      reachCheck = false;
    }else{
      reachCheck = true;
    }if(cookies.uid){
      dispatch(createUserLog(user.href,user.referrer,user.screenWidth,user.screenHeight,true,reachCheck,purchased,date,time, cookies.uid))
    }else{
      dispatch(createUserLog(user.href,user.referrer,user.screenWidth,user.screenHeight,true,reachCheck,purchased,date,time, null))
    }


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
    dispatch(getCagegory())

    
    console.log(sessionStorage.getItem('user'));

 	}, [dispatch]);

	const products = useSelector((state) => state.getProduct.products);
	// console.log(products);
  const categories = useSelector((state)=> state.getCategory.categories)
  console.log(categories)


  const [productList, setProduct] = useState([]);

  return (
    <>
      <Topbar />
      
      <FeaturedInfo />
          <div className="categoryListTitle">
              <h2>All Categories</h2>
          </div>
          <div className="categoryCardList">
              <div className="categoryCardListHolder">
                <div className="categoryCardListContent">                  
                    <div className="categoryCardContentWrapper">
                      { !categories?.length ? <div></div> :
                        (
                          categories.map((val,key)=>{
                            return(
                              <CategoryCard
                                key={val.id}
                                title={val.ctgr_title}
                                rating={val.ctgr_rating}
                                image={val.ctgr_img}
                                value={val.ctgr_value}
                              
                              />
                            )
                          })
                        )

                      }

                        {/* <CategoryCard/>
                        <CategoryCard/> 
                        <CategoryCard/>
                        <CategoryCard/>
                        <CategoryCard/> */}
                        
                                         
                    </div>
                </div>
                
              </div>
          </div>

          <div className="addsAndShow">
            <div className="addsAndShowContainer">
              <div className="imageSliderSide">
                <ImageSlider 
                  className="imageSliderComponent" 
                  slides={sliderData} />
              </div>
              <div className="newItemSide">
                <div className="newItemSideHolder">
                    <div className="newItemsTitle">
                        <h3>New Products     <StarsSharpIcon/></h3> 
                        <span>Top 5 newest Products for you</span>
                    </div>
                    <div className="newItemContainerContent"> 
                        <div className="newItemsContainer">
                             <ProductCard/>
                              <ProductCard/>
                              <ProductCard/>
                              <ProductCard/>
                              <ProductCard/>
                        </div>
                         
                      </div>
                      

                </div>
              </div>
            </div>
          </div>




       
         
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
                        rating={val.rating}
                        />

                    </div>
                    
                  )
                }) 
              )
            }
        </div>
      </div> 
       {/* <ContactUs /> */}
      <Footer />  
    </>
  )
}
