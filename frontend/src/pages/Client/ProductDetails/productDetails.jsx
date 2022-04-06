import './productDetails.css'
import Topbar from '../../../components/Client/topbar/topbar'
import Footer from '../../../components/Client/footer/footer'

import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import IconButton from '@material-ui/core/IconButton';
import { Button } from 'antd';
import AddShoppingCartOutlinedIcon from '@material-ui/icons/AddShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import { useState,useEffect } from 'react';

import { getProductsDetails } from '../../../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/actions/cartActions';
import {addToWishlist} from '../../../redux/actions/wishlistAction'

import { getProductsById } from '../../../redux/actions/productActions';

export default function ProductDetails({ match, history }) {

    const id = match.params.id;
    // console.log('id = ' + id);
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
    // console.log({...product[0].id});
    
    //handler state change in qty 
    const [qtyCounter , setQtyCounter] = useState(1);
    const [wishlistQty , setWishlistQty] = useState(1);
    
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
        if(qtyCounter >= product.countInStock){
            alert("Maximum amount of product Available is:" + qtyCounter);
        }
        else{
            setQtyCounter( qtyCounter + 1);
        }
    }

    //adding to cart
    const addToCartHandler = () =>{
        if(product.countInStock === 0){
            alert("Product Not Available");
        }else{

            dispatch(addToCart(product.id , qtyCounter));
            history.push('/cart');
        }

    }
    // adding to wishlist
    const addToWishlistHandler = ()=>{
        dispatch(addToWishlist(product.id))
        history.push('/wishlist')
    }


  return (
     <> 
     <Topbar/>
        <div className='productDetials'>
            <div className="productDetailsWrapper">
                <div className="pathTitle">
                    <p>    Home / {product.productName} </p>
                </div>
                <div className="productDetailContainer">
                    <div className="productImgHolder">
                            <img src={product.productImg} />
                    </div>
                    <div className="productInfoHolder">

                        <div className='productInfo'>
                            <div className="productNameHolder">
                                <p>{product.productName}</p>
                            </div>
                            <div className="productRatingHolder">
                                <span>Ratting starts</span>
                            </div>
                            <div className="productPriceHolder">
                                
                                 <p> ${product.productPrice}</p>    
                            </div>
                            <div className="productDescription">
                                <span>Description</span>
                                <p>{product.productDetail}</p>
                            </div>
                            <div className="productBrand">
                            <span>{product.productBrand}</span> <br />
                            
                            </div>
                            <div className="productStatus">
                                <span>Status:  <p> {product.countInStock > 0? "In Stock" : "Out of Stock"}</p></span>
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
                                    <Button type="primary"  className='add_to_cart_btn' onClick={addToCartHandler}>
                                    <AddShoppingCartOutlinedIcon/> <p>Add To Cart </p>
                                    </Button>
                                    
                                    <IconButton aria-label="add to wish list" onClick={addToWishlistHandler}>
                                        <FavoriteBorderOutlinedIcon />
                                    </IconButton>


                                </div>


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
