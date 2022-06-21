import React from "react";
import './wishlist.css'
import '../Cart/cart.css'
import Topbar from "../../../components/Client/topbar/topbar";
import Footer from "../../../components/Client/footer/footer";
import WishlistItem from "../../../components/Client/wishlistItem/wishlistItem";

import { useDispatch , useSelector } from "react-redux";
import { removeFromWishlist } from "../../../redux/actions/wishlistAction";
import { addToCart } from "../../../redux/actions/cartActions";

export default function Wishlist() {

    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist);
    const {wishlistItems} = wishlist;


    const removeFromWishlistHandler=(id) =>{
        dispatch(removeFromWishlist(id));
    }
    const addToCartHandler = (id) =>{
        dispatch(addToCart(id,1));
    }

    return(
        <>
            <Topbar />
        <div className="wishlistContainer">
            <div className="wishlistWrapper">
                <div className="headerBar">
                    <p className='headerBarContent'>Home / Wishlist</p>
                </div>
                <div className="wishlistTitle">
                    <h2 className='cartTitleContent' >WishList </h2>
                </div>
                <div className="wishlistTabel">
                    <div className="wishlistTabelHolder">
                        {wishlistItems.length === 0?(
                       <p>  Your Wishlist Is Empty:   </p>
                            ): wishlistItems.map((item)=>
                                <WishlistItem item={item} 
                                    removeFromWishlistHandler={removeFromWishlistHandler}
                                    addTocartHandler={addToCartHandler}
                                                
                                /> )}
                        

                    </div>
                </div>
            </div>
        </div>




        {/* <Footer />  */}
        </>
    )
}

