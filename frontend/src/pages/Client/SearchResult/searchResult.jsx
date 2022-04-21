import React, { useEffect, useState } from 'react'
import './searchResult.css'

import Topbar from '../../../components/Client/topbar/topbar'
import ProductCard from '../../../components/Client/productCard/productCard'
import ContactUs from '../../../components/Client/contactUs/contactUs'
import Footer from '../../../components/Client/footer/footer'

//import redux to use redux action and constants

import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySearch } from '../../../redux/actions/productActions';
//import redux actions to call all the functions
// import { getProducts as listProducts } from '../../../redux/actions/productActions'

import { useParams } from 'react-router-dom';

export default function SearchResult() {
  const {name} = useParams();
  const {category} = useParams;
  console.log('id = ' + name);
  const dispatch = useDispatch();

 	// useEffect(() => {
 	//   dispatch(getProductsBySearch(name, category));
 	// }, [dispatch]);

  const products = useSelector((state) => state.getProductsSearch.productSearch);
  console.log(products);

  const [productList, setProduct] = useState([]);

  return (
    <>
      <Topbar />
      <div className='homeScreen_products'>
        {/* {console.log('in home'+ productList)}
        {console.log(products)} */}
        <h3 productCardTitle>Search result</h3>

        <div className="productHolder">
            {
              !products.length ? <div></div> : (
                products.map((val, key) => {
                  console.log(val);
                  return (
                    <div className='items'>
                    
                      <ProductCard 
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
