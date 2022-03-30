import React from 'react'
import ContactUs from '../../../components/Client/contactUs/contactUs'
import Topbar from '../../../components/Client/topbar/topbar'
import './checkout.css'
import { ArrowDropDown } from '@material-ui/icons'
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'

import { createOrders } from '../../../redux/actions/orderActions';
import { createOrderDetails } from '../../../redux/actions/orderDetailAction'

export default function Checkout() {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = useSelector((state) => state.getUser.user);
		let users = [];

		{user.map((pro) => {
			users = pro;
			console.log(users);
		})}

		// if(user.length){
    //     setIsLoggedIn(true);
    // }else{
    //     setIsLoggedIn(false);
    // }

		const getTotalProductPrice = ()=>{
			return cartItems.reduce((price , item)=> item.price * item.qtyCounter + price , 0)
		}

		function User() { 
			const user = useSelector((state) => state.getUser.user); // Rule 1: call hooks in top-level
			return <>{user}</>
		}

    const handleConfirm = () => {
      console.log(cartItems);
			let date = Date();
			// const pt = user;
			// console.log('cun pt: ' + pt);
			// console.log(users);
      if(1){
        console.log(user);
				console.log(users);
				dispatch(createOrders(date,users.userId, 100));
				{cartItems.map((cart) => {
					console.log('chekh out' + cart.product + cart.qtyCounter);
					dispatch(createOrderDetails(date, cart.product, cart.qtyCounter));
				})}
      }else{
        console.log('login in first');
      }
    }

  return (
    <>
    <Topbar/>

        <div className='checkout'>
            <div className='checkoutPath'>
                <p className='pathContent'>Home     /       Shopping Cart    / Checkout</p>
            </div>
            <div className='checkoutTitle'>
                <h1 className='titleContent'>Checkout</h1>
            </div>
            
            <div className="stepsWrapper">
							<div className='stepOne'>
								<input className='collapsibleCheckbox' type="checkbox" id='stepOne_collapsible-head' />
                <label for='stepOne_collapsible-head'>
									<p> Step1: Checkout Option </p>  
									<ArrowDropDown style={{fontSize:30}}/>  
								</label> 
                <div className='collapisble-content'>
									<div className="forms">
										<div className="new_customer_form">
											<h2 className='newCustomerTitle'>
												New Customer
											</h2>
											<p>Checkout Options:</p> 
											<input type="checkbox" label="Register" className='ckecked' />
											<p>By creating an account you will be able to shop faster, be up to date on an order's status,and keep track of the orders you have previously made.</p>
											<Button variant="outlined" className='new_customer_form_btn'
                      color="primary" href="#">
												Continue
											</Button>
										</div>
										<div className='returning_customer_form'>
											<h2 className='returningCustomerTitle'>
												Returning Customer
											</h2>
											<p>I am a returning customer</p>
											<p>Email</p>
											<input type="email" placeholder='Email' className='email_input' id='email' name='email'  />
											<p>Password</p>
											<input type="password" placeholder='Password' className='password_input' id='password' name='password' />
												<Button variant="contained" className='loginBtn' color="primary" href="#">
													Login
												</Button>
									</div>
                  	  </div>                   
                </div>
                </div>

                <div className='stepTwo'>
                    <input className='collapsibleCheckbox' type="checkbox" id='stepTwo_collapsible-head' />
                <label for='stepTwo_collapsible-head'><p> Step2: Account & Billing Details </p>  <ArrowDropDown style={{fontSize:30}}/>  </label> 
                <div className='collapisble-content'>
                    <div className="step2ContentWrapper">
                    <div className="formHolder">
                        <div className="personal">
                            <h3>Personal Details</h3>
                            <div className="personalForm">
                                <p>First Name</p>
                                <input type="text" className='firstName' id='Fname' name='Fname' placeholder='First Name' />
                                <p>Last Name</p>
                                <input type="text" className='lastName' id='Lname' name='Lname' placeholder='Last Name' />
                                <p>Email</p>
                                <input type="email" className='email' id='emailAdress' name='emailAddress' placeholder='Email' />
                                <p>Phone Number</p>
                                <input type="text" className='phoneNumber' id='Pnumber' name='Pnumber' placeholder='Phone Number' />
                                <p>Fax</p>
                                <input type="number" className='faxNumber' id='fax' name='fax' placeholder='Fax' />
                                
                                <h4>Your Password</h4>

                                <p>Password</p>
                                <input type="password" className='password' id='password' name='password' placeholder='Password' />
                                <p>Confirm Password</p>
                                <input type="password" className='confirmPassword' id='confirm_password' name='confirm_password' placeholder='Confirm Password' />
                            </div>
                           

                        </div>
                        <div className="address">
                            <h3>Address Details</h3>
                            <div className="addressForm">
                                <p>Address 1</p>
                                <input type="text" className='addressOne' id='address_one' name='address_one' placeholder='Address 1' />
                                <p>Address 2</p>
                                <input type="text" className='addressTwo' id='address_two' name='address_two' placeholder='Address 2' />
                                <p>City</p>
                                <input type="text" className='city' id='city' name='city' placeholder='City' />
                                <p>Postal Code</p>
                                <input type="number"  className='postalCode' id='postal_code' name='postal_code' placeholder='Postal Code' />
                                <p>Country</p>
                                <input type="text" className='country' id='country' name='country' placeholder='Country' />
                                <p>Region / State</p>
                                <input type="text" className='stateRegion' id='state_region' name='state_region' placeholder='Region / State' />
                            </div>                           

                        </div>                     

                    </div>
                        <div className="btnHolder">
                                <Button variant="contained" className='step2_submit_btn' color="primary" href="#">
                                    Submit
                                </Button>
                        </div>
                    </div>
                                  
                </div>
                </div>

                <div className='stepThree'>
                    <input className='collapsibleCheckbox' type="checkbox" id='stepThree_collapsible-head' />
                <label for='stepThree_collapsible-head'><p> Step3: Delivery Details </p>  <ArrowDropDown style={{fontSize:30}}/>  </label> 
                <div className='collapisble-content'>
                  hey step three
                                  
                </div>
                </div>

                <div className='stepFour'>
                    <input className='collapsibleCheckbox' type="checkbox" id='stepFour_collapsible-head' />
                <label for='stepFour_collapsible-head'><p> Step4: Delivery Methods </p>  <ArrowDropDown style={{fontSize:30}}/>  </label> 
                <div className='collapisble-content'>
                  hey step Four
                                  
                </div>
                </div>

                <div className='stepFive'>
                    <input className='collapsibleCheckbox' type="checkbox" id='stepFive_collapsible-head' />
                <label for='stepFive_collapsible-head'><p> Step5: Payment Details </p>  <ArrowDropDown style={{fontSize:30}}/>  </label> 
                <div className='collapisble-content'>
                  hey step five
                                  
                </div>
                </div>

                <Button variant="contained" className='submitAll' color="primary" href="#" onClick={handleConfirm}>
                    Confirm
                 </Button>


            </div>
        </div>


    <ContactUs/>
    <footer/>
    
    
    
    </>
  )
}
