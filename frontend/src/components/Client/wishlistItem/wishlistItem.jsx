import React from "react";
import './wishlistItem.css'

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
export default function WishlistItem({item , removeFromWishlistHandler , addTocartHandler}){

    console.log(item.date.toString())
    return(
        <div className='wishlistItem'>
          <div className="wishlistItemHolder">
            <div className='wishlistItem_img'>            
                <img src={item.imageUrl} alt={item.productName}/>           
            </div>
            <div className="wishlistItem_name">
                <p>{item.productName}</p>
            </div>
            <div className="wishlistItem_brand">
                <p>{item.brand}</p>
            </div>
            <div className="wishlistItem_date">
                <p>{item.date.toString()}</p>
            </div>
                  
            <button className='wishlistItem_delete_btn'  onClick={()=> removeFromWishlistHandler(item.product)}  >
               <DeleteOutlineIcon  />
            </button>
            <button className="wishlistItem_addToCart_btn" onClick={()=> addTocartHandler(item.product)}>
                <AddShoppingCartIcon/> 
            </button>
          </div>
      </div>
    )
}
