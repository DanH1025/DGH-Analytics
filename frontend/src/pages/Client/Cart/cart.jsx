import React, {useEffect} from 'react'
import './cart.css'

import { Link } from 'react-router-dom';

import { Button } from 'antd';

import Footer from '../../../components/Client/footer/footer'
import Topbar from '../../../components/Client/topbar/topbar'
import ContactUs from '../../../components/Client/contactUs/contactUs'
import CartItem from '../../../components/Client/cartItem/cartItem'
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

import ShopOutlinedIcon from '@material-ui/icons/ShopOutlined';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../../../redux/actions/cartActions'

import { useCookies } from 'react-cookie';
import { useState } from 'react';

export default function Cart() {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const [location, setLocation] = useState('');
    const {cartItems} = cart;

    useEffect(() => {
        let path = document.location.pathname;
        path = path.substring(1);
        console.log(path);
        setLocation(path);
        console.log(location);
    })

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

    const [cookies, setCookie] = useCookies(['user']);

  return (
     <>
     <Topbar />
    
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
                       <p className='cartEmpty'>  Your Cart Is Empty:  <span> <SentimentVeryDissatisfiedIcon /></span>  </p>
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


            <div className="cartPageButtons">
                <div className="cartPageButtonHolder">
                
                <Link to={'/'}>
                    <Button type="primary" ghost> Continue Shopping </Button>
                </Link>
                <Link to={cookies.uid ? '/checking'  :'/login'} >
                {console.log(document.location)}  
                    <Button type="primary" ghost> Checkout   </Button> 
                </Link>
                
                </div>                
            </div>        
        </div>
        {/* <ContactUs />
      */}

    </div>
    </>
  )
}
