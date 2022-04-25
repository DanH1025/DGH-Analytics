import React from 'react'
import './productCard.css'
import {Link} from 'react-router-dom';
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


export default function ProductCard( props ) {

  const classes = useStyles(); 
  // console.log(props);
  return (
    <>
    <div className='productCard'>
      <div className="productCardWrapper">
        <div className="cardView">
          <Card className='card' >
            <Link to={`/productDetails/${props.productId}`}>
              <CardMedia 
                className="cardImg"
                image={props.imageUrl} alt={props.name}
                title={props.name}
              />
            </Link>
            <CardContent className='itemCardBodyHolder'>
              <Typography className='ItemsCardBodyProductName' >
                 <p>{props.name}</p>  
              </Typography>
              <Typography   className='ItemsCardBodyProductBrand' >
                  <p>{props.brand} </p>
              </Typography>
              <Typography  className='ItemsCardBodyProductPrice' >
                <p> <b>$</b>{props.price}  </p>
              </Typography>
            </CardContent>
            <CardActions className='itemCardActionButtonHolder'>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
                                    
            </CardActions>   
          </Card>
        </div>
      </div>  
    </div>

    </>
  );
}
