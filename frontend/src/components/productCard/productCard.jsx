import React from 'react'
import './productCard.css'

//import for the card view
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';





const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 300,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },    
  }));

export default function ProductCard({productId, name,price , brand, imageUrl}) {

    const classes = useStyles(); 
    
  return (
    <div className='productCard'>
      <div className="productCardWrapper">
        <h3 productCardTitle>Our Products</h3>
        <div className="cardView">
          <Card className='card'>
          <CardMedia
            className="cardImg"
            image={imageUrl} alt={name}
            title="device"
          />
          <CardContent>
            <Typography variant='body2' color='textSecondary' component='p'>
              {name}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {brand}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {price} 
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <button className='viewItemDetail'>View</button>                        
          </CardActions>   
          </Card>
        </div>
      </div>    
    </div>
  );
}
