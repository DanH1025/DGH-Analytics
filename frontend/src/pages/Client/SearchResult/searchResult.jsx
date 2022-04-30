import React, { useEffect, useState } from 'react'
import './searchResult.css'

import Topbar from '../../../components/Client/topbar/topbar'
import ProductCard from '../../../components/Client/productCard/productCard'
import ContactUs from '../../../components/Client/contactUs/contactUs'
import Footer from '../../../components/Client/footer/footer'
import { Button } from 'antd/lib/radio'
import DisplayStart from '../../../components/Client/displayStars/displayStars';

//import redux to use redux action and constants

import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySearch } from '../../../redux/actions/productActions';
//import redux actions to call all the functions
// import { getProducts as listProducts } from '../../../redux/actions/productActions'

import { useParams } from 'react-router-dom';
import Search from 'antd/lib/transfer/search'


import { Input } from 'antd';
import { Checkbox } from 'antd';



export default function SearchResult() {
  const {name} = useParams();
  const {category} = useParams();
  console.log('id = ' + name);
  const dispatch = useDispatch();

  const [price, setPrice] = useState({
    min: "",
    max: ""
  });

  const [amount, setAmount] = useState("");

 	// useEffect(() => {
 	//   dispatch(getProductsBySearch(name, category));
 	// }, [dispatch]);

  const products = useSelector((state) => state.getProductsSearch.productSearch);
  console.log(products);


  let categories = [];
  products.map((prod) => {
    if (categories.includes(prod.productCategory) === false) 
      categories.push(prod.productCategory);
  })
  console.log(categories);

  const [productList, setProduct] = useState([]);

  const handleButton = () => {
    console.log('not cool');
  }

  function onChange(e) {
    console.log(`checked = ${e.target.checked} ${e.target.value}` );
    
  }
  
  

  return (
    <>
      <Topbar />
      <div className="searchPage">
        <div className="searchBar">
          <div className='onRating'>
            <h3>Product Review</h3>
            <ul>
              <li><DisplayStart rating={5}/></li>
              <li><DisplayStart rating={4}/></li>
              <li><Button onClick={handleButton}><DisplayStart rating={3}/></Button></li>
              <li><Button onClick={handleButton}><DisplayStart rating={2}/></Button></li>
              <li><Button onClick={handleButton}><DisplayStart rating={1}/></Button></li>  
            </ul>
          </div>

          <div className='onCategory'>
            <h3>Category</h3>
            {
              categories.map((catego) => {
                return(
                  <Checkbox onChange={onChange} value={catego}>{catego}</Checkbox>
                )
              })
            }
          </div>

          <div className="onAmount">
            <h3>Min order</h3>
            <div className="row">
              {/* <Search style={{width: '5px'}}/> */}
              <Input placeholder="min" value={amount} 
              onChange={(e) => {
                setAmount(e.target.value)} 
              }/>
              <Button style={{margin: '0 1px 0 7px'}}>Ok</Button>
            </div>
          </div>

          <div className="onPrice">
            <h3>Price-range</h3>
            <div className="row">
            <Input placeholder="min" 
                  value={price.min} 
                  onChange={(f) => {
                    setPrice({
                      ...price, min: f.target.value
                    })
                  } 
              }/>
            <span> - </span>
            <Input placeholder="max" 
                  value={price.max} 
                  onChange={(g) => {
                    setPrice({
                      ...price, max: g.target.value
                    })
                  } 
              }/>
            <Button style={{margin: '0 1px 0 7px'}}>Ok</Button>
            </div>
          </div>

        </div>
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
                          rating={val.rating}
                          />
                      </div>                  
                    )
                  }) 
                )
              }
          </div>
        </div>
      </div>
      <ContactUs />
      <Footer />
    </>
  )
}
