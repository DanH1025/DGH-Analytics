import React, {useRef, useState, useEffect} from 'react'
import ContactUs from '../../../components/Client/contactUs/contactUs'
import Topbar from '../../../components/Client/topbar/topbar'
import './checkout.css'

import ReactMapGL , {Marker} from 'react-map-gl';
import {  Input, Button , message } from 'antd';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../../../components/Client/cartItem/cartItem';
import { createOrders } from '../../../redux/actions/orderActions';
import { createOrderDetails } from '../../../redux/actions/orderDetailAction'
import { addToCart, removeFromCart } from '../../../redux/actions/cartActions'
import {LocalShippingOutlined,LocalPhoneOutlined,MonetizationOnOutlined,RedeemOutlined} from '@material-ui/icons';


export default function Checkout() {

    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    console.log(cartItems)

    const user = useSelector((state) => state.getUser.user);
    console.log(user);
		let users = [];

		const getUs = () => {
      console.log('in get us');
      user.map((pro) => {
			  users = pro;
			  console.log(users);
		  }
    )}

    useEffect(() => {
      sessionStorage.setItem('reachedCheckout', true);
    })
		// const getTotalProductPrice = ()=>{
		// 	return cartItems.reduce((price , item)=> item.price * item.qtyCounter + price , 0)
		// }

		// function User() { 
		// 	const user = useSelector((state) => state.getUser.user); // Rule 1: call hooks in top-level
		// 	return <>{user}</>
		// }

      

    const [viewPort , setViewPort] = useState({
      latitude:9.022875,
      longitude: 38.752261,
      zoom:11,
      width: '100vw',
      height: '100vh'
    })
    const [marker,setMarker] = useState({
      latitude: 9.022875,
      longitude: 38.752261
    })
    const [phoneNumber , setPhoneNumber] = useState("")

    const handleConfirm = () => {
     // message.success("Order Placed");
     
      console.log()
      console.log(cartItems[0])
      const date = new Date();
      getUs();
     

      if(users?.userId){
        dispatch(createOrders(date, users.userId, getTotalProductPrice(), marker.latitude,marker.longitude, phoneNumber ))

        cartItems.map((item)=>{
          dispatch(createOrderDetails(date, item.product , item.qtyCounter, item.price))
        });
        message.success("Order Placed");
        sessionStorage.setItem('purchased', true);
        console.log(phoneNumber)

        let purchased = false;
        let reachCheck = false;
        if (sessionStorage.getItem('purchased') === null) {
          console.log('purchased found');
          purchased = sessionStorage.getItem('purchased');
        }else{
          console.log('purchased not found');
          console.log(sessionStorage.getItem('purchased'));
          purchased = false;
        }
        if (sessionStorage.getItem('user') === null) {
          reachCheck = sessionStorage.getItem('reachedCheckout');
          console.log('userr found');
        }else{
          console.log('user not found');
          reachCheck = false;
        }
      }
      else{
        message.error("Order Place Failed: Check if you are logged in");
      }


   
      // console.log(cartItems);
			// let date = Date();
      // getUs();
      // console.log(users);
			// // const pt = user;
			// // console.log('cun pt: ' + pt);
			// // console.log(users);
      // if(users?.userId){
      //   setErrMsg('');
      //   console.log(user);
      //   message.success("Order Placed")
			// 	// console.log(users);
			// 	dispatch(createOrders(date,users.userId, 100));
			// 	{cartItems?.map((cart) => {
			// 		console.log('chekh out' + cart.product + cart.qtyCounter);
			// 		dispatch(createOrderDetails(date, cart.product, cart.qtyCounter));
			// 	})}
      // }else{
      //   console.log('login in first');
      //   setErrMsg('Login in first');
      // }
    }



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
    <>
    <Topbar/>

       <div className='checkout'>
         <div className='checkoutPath'>
           <p className='pathContent'>
             Home     /       Shopping Cart    / Checkout</p>
         </div>
         <div className="checkoutTitleHolder">
            <h3>Checkout</h3>
         </div>
         {/* <div className='checkoutTitle'>
           <h1 className='checkout_titleContent'>Checkout</h1>
         </div> */}

         <div className="checkoutSteps">
           <div className="stepTitle">
              <p>Step 1 - Delivery Details</p>
           </div>
           <div className="stepOneContainer">
              <div className="mapHolder">
                 <ReactMapGL {...viewPort} 
                 mapboxAccessToken="pk.eyJ1IjoiZGFuaGdiIiwiYSI6ImNsMXVnNDIxbzAwMmYzcXBiMXB0ZWVjcWMifQ.nC63RhWneFhiZ4k4XJim9A" 
                 onMove={(viewPort)=> { setViewPort(viewPort)}}
                 mapStyle="mapbox://styles/mapbox/streets-v11"
                 onClick={(viewPort)=> { 
                        setMarker({
                          latitude: viewPort.lngLat.lat,
                          longitude: viewPort.lngLat.lng
                        }) 
                  console.log(viewPort) }}
                  
                
                 
                 >
                 
                  <Marker latitude={marker.latitude} longitude={marker.longitude} />
                 </ReactMapGL>   
             
             
              </div>
              <div className="stepOneInfo">
                <div className="infoHolder">
                      <div className="lngLat">
                        <div className="latHolder"> <Input prefix="Lat" value={marker.latitude}  disabled /></div>
                        <div className="lngHolder"><Input prefix="Lng" value={marker.longitude} disabled /></div>
                        
                         
                      </div>
                      <div className="locationName">
                        <Input prefix={<LocationOnIcon />} placeholder='Location ' value={""} disabled  />
                      </div>
                      <div className="phoneNumber">
                          <Input type="number" 
                            prefix="(+251)" placeholder='Phone Number'
                            value={phoneNumber}
                            className='phone_number_input'
                            onChange={(e)=> setPhoneNumber(e.target.value) } 
                            
                            />
                      </div>
                </div>
              </div>
           </div>

           <div className="stepTitle">
              <p>Step 2 - Confirm Shopping Cart</p>
           </div>
           <div className="cartConfirm">
                    {cartItems.length === 0?(
                       <p className='cartEmpty'>  Your Cart Is Empty:  <span> <SentimentVeryDissatisfiedIcon /></span>  </p>
                    ): cartItems.map((item)=>
                         <CartItem item={item} 
                                    qtyChangeHandler={qtyChangeHandler} 
                                    removeFromCartHandler={removeFromCartHandler}    
                        /> )}

            
              <div className="checkoutInfo" >
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
                        <div className="total">
                            <div className="tag">
                                <p>Delivery Charges:</p> 
                            </div>
                            <div className="amount">
                              <p className='totalPriceNumber'>$50 </p>
                            </div>
                        </div>
                        <div className="total"  style={{background: '#c3ffc0'}} >
                            <div className="tag">
                                <p>SubTotal Price:</p> 
                            </div>
                            <div className="amount">
                              <p className='totalPriceNumber'>${getTotalProductPrice().toFixed(2)} </p>
                            </div>
                        </div>
                        
                    </div>
                </div>
              </div>


              
           </div>



           <div className="stepTitle">
              <p>Step 3 - Payment Methods</p>
           </div>
           <div className="payment_methods">
              <div className="featuredInfo">
                <div className="featuredInfoWrapper">
                    <div className="content">
                        <div className="contentWrapper" style={{justifyContent:"left"}}>                
                    
                            <div className="memberDisountContent">
                                <div className="memberDiscount">
                                    <MonetizationOnOutlined  className='contentIcon'/>
                                    <div className='memberDiscountInfo'>
                                        <p className='contentTitle'>Cash on Delivery</p>
                                        <p className='contentDetail'>Pay with cash after</p>
                                    </div>
                                </div>
                            </div>                 
                        </div>
                    </div>
                </div>
            </div>
           </div>

           <div className="confirmOrder">
               <Button onClick={handleConfirm} type="primary" contained> Order </Button>
           </div>



         </div>






       </div>
           
        


   <ContactUs/>
   <footer/>
   
   
   

   </>




  )
}




















