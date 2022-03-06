import React, {useState , useEffect} from 'react'
import './footer.css'

// import {TwitterIcon} from '@mui/icons-material/Twitter';
// import {FacebookIcon} from '@mui/icons-material/Facebook';
// import {InstagramIcon} from '@mui/icons-material/Instagram';

import {InstagramIcon, FacebookIcon, TwitterIcon} from '@mui/icons-material';


export default function Footer(){
	return(
		<div className='footer'>
			<div className='footerWrapper'>
				 <div className='footerView'>
						<div className='footerItem footer'>
							<p>Copyright © 2017 Plazathemes. All Rights Reserved.</p>
						</div>
						<div className='footerItem footer'>
							<InstagramIcon/>
							<FacebookIcon/>
							<TwitterIcon/>
						</div>
				 </div>
			</div>
		</div>
	);
}