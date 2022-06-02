import React, { useEffect, useState } from 'react'
import './searchResult.css'

import Topbar from '../../../components/Client/topbar/topbar'
import ProductCard from '../../../components/Client/productCard/productCard'
import ContactUs from '../../../components/Client/contactUs/contactUs'
import Footer from '../../../components/Client/footer/footer'
// import { Button } from 'antd/lib/radio'
import { Button } from '@material-ui/core'
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
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

 	// useEffect(() => {
 	//   dispatch(getProductsBySearch(name, category));
 	// }, [dispatch]);

   const products = useSelector((state) => state.getProductsSearch.products);
   console.log(products);
   // setProdcuts(products);
   // let displayedProducts = [];
   
   const [displayedProducts, setProdcuts] = useState(products);
   
   useEffect(() => {
     setProdcuts(products);
   }, [products])
   console.log(displayedProducts);

  let categories = {};
  products.map((prod) => {
    if (Object.keys(categories).includes(prod.productCategory) === false) 
      categories[prod.productCategory] = true;
  })
  console.log(categories);

  const [checkedList, setCheckedList] = useState([]);

  // const [checkedList, setCheckedList] = useState([]);
  // const [uncheckedList, setUnCheckedList] = useState([]);
  // setCheckedList(categories);


  // const onChanges = checkedList => {
  //   setCheckedList(checkedList);
  // };

  // const onCheckAllChange = e => {
  //   setCheckedList(e.target.checked ? categories : []);
  //   setUnCheckedList(e.target.checked ? [] : categories)
  // };

  // const onCheckItem = value => e => {
  //   setCheckedList(checkedList.includes(value) ? checkedList.filter(x => x !== value) : [checkedList, value]);
  //   setUnCheckedList(categories.filter(o => !checkedList.includes(o)));
  // };

  const [productList, setProduct] = useState([]);

  const handleButton = () => {
    let amt,maxP, minP;
    if(amount === ''){ amt = 0 } else{ amt = amount }
    if(maxPrice === ''){ maxP = 10000000000 } else { maxP = maxPrice }
    if(minPrice === ''){ minP = 0 } else {minP = minPrice }
    console.log(amt);
    console.log(maxP);
    console.log(minP);

    if(maxPrice === '' && minPrice === '' && amount === ''){
      return;
    }
    let roducts = [];
    // if(maxPrice === '' && minPrice === ''){
      products.map((prod) => {
        console.log(prod.countInStock);
        if(prod.countInStock >= amount && minP <= prod.productPrice && prod.productPrice <= maxP){
          console.log('prod in the busisi of mind');
          roducts.push(prod);
        }
      })
    console.log(roducts);
    setProdcuts(roducts);
  }

  function onChange(e) {
    const ck = e.target.checked;
    console.log(`checked = ${e.target.checked} ${e.target.value}` );
    
    categories[e.target.value] = ck;
    console.log(categories);

    let roducts = [];

      Object.keys(categories).map((catego) => {
        if(categories[catego]){
          products.map((prod) => {
            if(prod.productCategory === catego){
              console.log('prod in the busisi of mind');
              roducts.push(prod);
            }
          })
        }
      })

    console.log(roducts);
    setProdcuts(roducts);
    console.log(categories);
  }

  const handleRating = (e) => {
    const prods = displayedProducts;
    console.log(prods);
    const rate = e.target.value;
    let roducts = [];
    prods.map((prod) => {
      console.log(prod.rating);
      console.log(rate);
      if(prod.rating >= rate){
        roducts.push(prod);
      }
    });
    console.log(roducts);
    setProdcuts(roducts);
  }

  return (
    <>
      <Topbar />
      <div className="searchPage">
        <div className="searchBar">
          <div className='onRating spacing'>
            <h3>Product Review</h3>
            <ul>
              <li>
                <Button value='5' onClick={handleRating} style={{padding: '0px'}}><DisplayStart rating={5} value={5} onClick={handleButton}/> up</Button>
              </li>
              <li>
                <Button value={4} onClick={handleRating} style={{padding: '0px'}}><DisplayStart rating={4} value={4} onClick={handleButton}/> up</Button>
              </li>
              <li>
                <Button value={3} onClick={handleRating} style={{padding: '0px'}}><DisplayStart rating={3} value={3} onClick={handleButton}/> up</Button>
              </li>
              <li>
                <Button value={2} onClick={handleRating} style={{padding: '0px'}}><DisplayStart rating={2} value={2} onClick={handleButton}/> up</Button>
              </li>
              <li>
                <Button value={1} onClick={handleRating} style={{padding: '0px'}}><DisplayStart rating={1} value={1} onClick={handleButton}/> up</Button>
              </li>  
              {/* <li><Button onClick={handleButton}><DisplayStart rating={1}/></Button></li>   */}
            </ul>
          </div>

          <div className='onCategory spacing'>
            <h3>Category</h3>
            {
              Object.keys(categories).map((catego) => {
                return(
                  <Checkbox 
                  // checked={onCheck} 
                      onChange={onChange}    
                      value={catego} >
                    {catego}
                  </Checkbox>
                  // <Checkbox
                  //   key={catego}
                  //   onChange={onCheckItem(catego)}
                  //   checked={checkedList.includes(catego)}
                  // >
                  //   {catego}
                  // </Checkbox>
                )
              })
            }
          </div>

          <div className="onAmount spacing">
            <h3>Min order</h3>
            <div className="row">
              {/* <Search style={{width: '5px'}}/> */}
              <Input placeholder="min" value={amount} 
              onChange={(e) => { setAmount(e.target.value)} 
              }/>
              <Button onClick={handleButton} style={{margin: '0 1px 0 7px'}}>Ok</Button>
            </div>
          </div>

          <div className="onPrice spacing">
            <h3>Price-range</h3>
            <div className="row">
              <Input placeholder="min" 
                    value={minPrice} 
                    onChange={(f) => { setMinPrice(f.target.value)} 
                }/>
              <span> - </span>
              <Input placeholder="max" 
                    value={maxPrice} 
                    onChange={(g) => { setMaxPrice(g.target.value)} 
                }/>
              <Button onClick={handleButton} style={{margin: '0 1px 0 7px'}}>Ok</Button>
            </div>
          </div>

        </div>

        <div className='homeScreen_products'>
          {/* {console.log('in home'+ productList)}
          {console.log(products)} */}
          <h3 productCardTitle>Search result</h3>

          <div className="search_productHolder">
            {/* {setProdcuts(products)} */}
            {
              !displayedProducts.length ? <div>No product found</div> : (
                displayedProducts.map((val, key) => {
                  // console.log(val);
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
      {/* <ContactUs />
      <Footer /> */}
    </>
  )
}
