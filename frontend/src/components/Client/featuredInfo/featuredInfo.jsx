import React from 'react'
import './featuredInfo.css'

import {LocalShippingOutlined,LocalPhoneOutlined,MonetizationOnOutlined,RedeemOutlined} from '@material-ui/icons';

export default function FeaturedInfo() {
  return (

    <div className="featuredInfo">
        <div className="featuredInfoWrapper">
            <div className="content">
                <div className="contentWrapper">                
                    <div className="deliveryContent">
                        <div className="delivery">
                            <LocalShippingOutlined  className='contentIcon'/>
                            <div className='deliveryInfo'>
                                <p className='contentTitle'>Free Delivery</p>
                                <p className='contentDetail'>Free delivery on all order</p>
                            </div>                        
                        </div>                        
                    </div>
                    <div className="onlineSupportContent">
                        <div className="onlineSupport">
                            <LocalPhoneOutlined  className='contentIcon'/>
                            <div className='onlineSupportInfo'>
                                <p className='contentTitle'>Online Support 24/7</p>
                                <p className='contentDetail'>We have Online support 24 hours a day</p>
                            </div>
                        </div>
                    </div>
                    <div className="moneyRevenueContent">
                        <div className="moneyRevenue">
                            <MonetizationOnOutlined  className='contentIcon'/>
                            <div className='moneyRevenueInfo'>
                                <p className='contentTitle'>Money Refund</p>
                                <p className='contentDetail'>Full refunding available</p>
                            </div>
                        </div>
                    </div>
                    <div className="memberDisountContent">
                        <div className="memberDiscount">
                            <RedeemOutlined  className='contentIcon'/>
                            <div className='memberDiscountInfo'>
                                <p className='contentTitle'>Member Discount</p>
                                <p className='contentDetail'>Disount on every Order -$</p>
                            </div>
                        </div>
                    </div>                 
                </div>
            </div>
        </div>
    </div>

  )
}
