import React, { useEffect } from 'react'
import './productDetails.css'
import Topbar from '../../components/topbar/topbar'
import Footer from '../../components/footer/footer'

import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getProductsById } from '../../redux/actions/productActions';

export default function ProductDetails({ match }) {
    const id = match.params.id;
    console.log('id = ' + id);
    const dispatch = useDispatch();
    let product = [];
    
    useEffect(() => {
        console.log('in use effect');
        dispatch(getProductsById(id));
    }, [dispatch]);
    
	const produc = useSelector((state) => state.getProductsDetail.product);
    console.log(produc);    
    // const product = produc[0];
    // console.log(product);
    // console.log(product[0]);

    // console.log({...produc[0], id});
    {produc.map((pro) => {
        product = pro;
        console.log(product);
	})}
    console.log(product.productImg);
    
    //handler state change in qty 
    const [qtyCounter , setQtyCounter] = useState(1);
    
    //decrease the value of qty
    const handleMinQty = () =>{

        if(qtyCounter ===  1){
            alert("Minimum Quantity is : 1");
        }
        else{
            setQtyCounter(qtyCounter - 1);
        }

    }
    //increase the value if qty
    // add counter should only go as far as the ammount in stock , check validity
    const handlePlusQty =()=>{
        setQtyCounter( qtyCounter + 1);
    }

  return (
     <> 
     <Topbar/>
        <div className='productDetials'>
            <div className="productDetailsWrapper">
                <div className="pathTitle">
                    <p>    Home / <span>Product Name</span> </p>
                </div>
                <div className="productDetailContainer">
                    <div className="productImgHolder">
                            <img src={product.productImg} />
                    </div>
                    <div className="productInfoHolder">
                        <div className="productNameHolder">
                            <p>{product.productName}</p>
                        </div>
                        <div className="productRatingHolder">
                            <span>Ratting starts</span>
                        </div>
                        <div className="productPriceHolder">
                            
                            <p>$ {product.productPrice}</p>    
                        </div>
                        <div className="productDescription">
                            <span>{product.productDetail}</span>
                        </div>
                        <div className="productBrand_availablity">
                           <span>{product.productBrand}  product Availability</span>
                        </div>
                       
                        <div className="addingToCart">

                            <div className="addQtyHolder">
                               <p> Qty: <span> <RemoveOutlinedIcon onClick={handleMinQty} />
                                <input type="text"
                                        min={0}
                                        value={qtyCounter}
                                              
                                /> <AddOutlinedIcon  onClick={handlePlusQty} /> 
                                
                                        </span>
                                </p>
                            </div>

                            <div className="addToCartBtnHolder">
                                <Button variant="outlined" className='add_to_cart_btn'>
                                   <AddShoppingCartOutlinedIcon/>  Add To Cart
                                </Button>
                                
                                <IconButton aria-label="add to wish list">
                                    <FavoriteBorderOutlinedIcon />
                                </IconButton>


                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <Footer/>
    </>
  )
}
