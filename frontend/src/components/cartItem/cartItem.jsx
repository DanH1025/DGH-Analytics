import React from 'react'
import './cartItem.css'
import { Link } from 'react-router-dom'
import {DeleteOutline} from '@material-ui/icons'


export default function CartItem() {
  return (
      <div className='cartItem'>
          <div className='cartItem_img'>
            <img src=''  alt='img name' />
          </div>

          <Link to={'/productView'}>
              <p className='cartItem_name'>Item Name</p>            
          </Link>
          <p className='cartItem_price'>$ Item Price</p>
          {/* <select className='cartItem_select' value={item.qty} onChange={(e)=> qtyChangeHandler(item.product,e.target.value)} >
              {[...Array(item.countInStock).keys()].map(x =>(
                  <option key={x+1} value={x+1}>{x+1}</option>
              ))}
          </select> */}
          {/* <button className='cartItem_delete_btn' onClick={()=> removeFromCartHandler(item.product)}>
              <DeleteOutline />
          </button> */}
          <button className='cartItem_delete_btn'>
              <DeleteOutline />
          </button>
      </div>
  

  )
}
