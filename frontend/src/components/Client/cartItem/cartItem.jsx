import React from 'react'
import './cartItem.css'
import { Link } from 'react-router-dom'
import {DeleteOutline} from '@material-ui/icons'




export default function CartItem({item , qtyChangeHandler ,removeFromCartHandler}) {
  return (
    <div className='cartItem'>
        <div className="cartItemHolder">
            <div className='cartItem_img'>
            <Link to={`/productDetails/${item.product}`}>
                <img src={item.imageUrl}  alt={item.productName} />
            </Link>
            </div>
            <p className='cartItem_brand'>{item.brand}</p>
            <Link to={`/productDetails/${item.product}`}>
                <p className='cartItem_name'>{item.productName}</p>            
            </Link>
            <p className='cartItem_price'>${item.price}</p>

            <select className='cartItem_select' value={item.qtyCounter} onChange={(e)=>qtyChangeHandler(item.product, e.target.value)} >
                {[...Array(item.countInStock).keys()].map(x =>(
                    <option key={x+1} value={x+1}>{x+1}</option>
                ))}
            </select>
            {/* <button className='cartItem_delete_btn' onClick={()=> removeFromCartHandler(item.product)}>
                <DeleteOutline />
            </button> */}
            <button className='cartItem_delete_btn' onClick={()=> removeFromCartHandler(item.product)} >
                <DeleteOutline />
            </button>
        </div>
    </div>
  

  )
}
