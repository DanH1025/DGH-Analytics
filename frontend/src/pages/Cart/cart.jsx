import React from 'react'
import './cart.css'

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import Footer from '../../components/footer/footer'
import Topbar from '../../components/topbar/topbar'
import ContactUs from '../../components/contactUs/contactUs'
import CartItem from '../../components/cartItem/cartItem'


import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions'

export default function Cart() {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;


    const qtyChangeHandler = (id,qty) =>{
        dispatch(addToCart(id,qty))
    }

    const removeFromCartHandler=(id) =>{
        dispatch(removeFromCart(id));
    }

    //handle how many items are in the total cart
    const getCartCount = ()=>{
        return cartItems.reduce((qtyCounter, item) => Number(item.qtyCounter) + qtyCounter , 0);
    }

    //handle total price calculation
    const getTotalProductPrice = ()=>{
        return cartItems.reduce((price , item)=> item.price * item.qtyCounter + price , 0)
    }




  return (
     <><Topbar />
    <div className='cart'>
         
        <div className="cartWrapper">
            <div className="headerBar">
                <p className='headerBarContent'>Home / Shopping Cart</p>
            </div>
            <div className="cartTitle">
                <h2 className='cartTitleContent' >Shopping Cart </h2><ShopOutlinedIcon/>
            </div>
            <div className="cartTable">
                
                <div className="table">
                    {cartItems.length === 0?(
                        <h3>Your cart is Empty </h3>
                    ): cartItems.map((item)=>
                         <CartItem item={item} 
                                    qtyChangeHandler={qtyChangeHandler} 
                                    removeFromCartHandler={removeFromCartHandler}    
                        /> )}
                                    
                </div>
            </div>

            <div className="checkoutInfo">
                <div className="checkoutInfoWrapper">
                    <div className="infoBox">
                        <div className="selectedItems">
                            <div className="tag">
                                <p>Selected Items:</p> 
                            </div>
                            <div className="amount">
                               <p className='itemCountNumber'> {getCartCount()} </p>
                            </div>
                        </div>
                        <div className="total">
                            <div className="tag">
                                <p>Total Price:</p> 
                            </div>
                            <div className="amount">
                              <p className='totalPriceNumber'>${getTotalProductPrice().toFixed(2)} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="buttons">
                <div className="buttonHolder">
                    <Link to={'/'}><Button className='cartPageButton'  variant="contained" size='small' color="primary"> <p>Continue Shopping</p></Button></Link>
                    <Link to={'/checking'}><Button className='cartPageButton'  size='small' variant="contained" color='primary' > <p>Checkout </p> </Button></Link>
                </div>                
            </div>        
        </div>
        {/* <ContactUs />
        <Footer /> */}

    </div>
    </>
  )
}
