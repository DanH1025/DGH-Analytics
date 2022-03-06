import React, {useState , useEffect} from 'react'
import './contactUs.css'

export default function ContactUs(){
	return(
		<div className='contactUs'>
			<div className='contactUsWrapper'>
				 <div className='contactUsView'>
						<div className='contactUsViewItem contactUsContact'>
							<h4>CONTACT US</h4>
							<p>We are a team of designers and developers that create high quality Magento, Prestashop, Opencart themes and provide premium and dedicated support to our products.</p>
						</div>
						<div className='contactUsViewItem contactUsInfo'>
							<h4>INFORMATION</h4>
							<ul>
								<li>About Us</li>
								<li>Delivery Information</li>
								<li>Privacy Policy</li>
								<li>Terms & Conditions</li>
								<li>Wish List</li>
								<li>Gift Certificates</li>
							</ul>
						</div>
						<div className='contactUsViewItem contactUsAccount'>
							<h4>MY ACCOUNT</h4>
							<ul>
								<li>My Account</li>
								<li>Order History</li>
								<li>Wish List</li>
								<li>Newsletter</li>
								<li>Gift Certificates</li>
								<li>Brands</li>
							</ul>
						</div>
						<div className='contactUsViewItem contactUsExtra'>
							<h4>EXTRAS</h4>
							<ul>
								<li>Brands</li>
								<li>Gift Certificates</li>
								<li>Affiliates</li>
								<li>Specials</li>
								<li>Newsletter</li>
								<li>Order History</li>
							</ul>
						</div>
						<div className='contactUsViewItem contactUsHelp'>
							<h4>LET US HELP YOU</h4>
							<ul>
								<li>My Account</li>
								<li>Order History</li>
								<li>Shipping Rates & Policies</li>
								<li>Returns & Replacements</li>
								<li>Amazon Prime</li>
								<li>Manage Your Content</li>
							</ul>
						</div>		
				 </div>
			</div>
		</div>
	);
}