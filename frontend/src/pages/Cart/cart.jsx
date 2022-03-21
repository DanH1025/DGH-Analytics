import React from 'react'
import './cart.css'

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import Footer from '../../components/footer/footer'
import Topbar from '../../components/topbar/topbar'
import ContactUs from '../../components/contactUs/contactUs'
import CartItem from '../../components/cartItem/cartItem'


export default function Cart() {
  return (
     
    <div className='cart'>
         <Topbar />
        <div className="cartWrapper">
            <div className="headerBar">
                <p className='headerBarContent'>Home      /     Shopping Cart</p>
            </div>
            <div className="cartTable">
                <div className="cartTableTitle"><h2 className='cartTableTitleContent' >Shopping Cart</h2></div>
                <div className="table">
                    <CartItem/>
                </div>
            </div>

            <div className="checkoutInfo">
                <div className="checkoutInfoWrapper">
                    <div className="infoBox">
                        <div className="subTotal">
                            <div className="tag">
                                <p>SubTotal:</p> 
                            </div>
                            <div className="amount">
                                $40,000
                            </div>
                        </div>
                        <div className="total">
                            <div className="tag">
                                <p>Total:</p> 
                            </div>
                            <div className="amount">
                                $40,000
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="buttons">
                <div className="buttonHolder">
                    <Link to={'/'}><Button variant="outlined" color="primary">Continue Shopping</Button></Link>
                    <Link to={'/checking'}><Button variant="outlined" color="primary">Checkout</Button></Link>
                </div>                
            </div>        
        </div>
        <ContactUs />
        <Footer />

    </div>
  )
}
