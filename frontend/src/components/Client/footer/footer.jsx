import './footer.css'

// import {TwitterIcon} from '@mui/icons-material/Twitter';
// import {FacebookIcon} from '@mui/icons-material/Facebook';
// import {InstagramIcon} from '@mui/icons-material/Instagram';

import {Instagram, Facebook, Twitter} from '@material-ui/icons';


export default function Footer(){
	return(
		<div className='footer'>
			<div className='footerWrapper'>
				 <div className='footerView'>
						<div className='footerItem footer'>
							<p>Copyright © 2022 DGH Analytics. All Rights Reserved.</p>
						</div>
						<div className='footerItem footer'>
							<Instagram/>
							<Facebook/>
							<Twitter/>
						</div>
				 </div>
			</div>
		</div>
	);
}