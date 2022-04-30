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
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useState } from 'react';

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
  const [rating, setRating] = useState(0)
  // console.log(props);
  return (
    <>
    <Link to={`/productDetails/${props.productId}`}>
      <div className="productCard">
          <div className="productCardWrapper">
              <div className="productCardHeader">
                  <p>{props.name}</p> 
              </div>
              <div className="productImageHolder">
                  <img src={props.imageUrl} alt={props.name} />
              </div>
              <div className="productCardBody"> 
                  <span>                   
                    <StarBorderIcon style={props.rating >=1? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}} />
                    <StarBorderIcon style={props.rating >=2? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
                    <StarBorderIcon style={props.rating >=3? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
                    <StarBorderIcon style={props.rating >=4? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
                    <StarBorderIcon style={props.rating >=5? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
                  </span>                 
                  <p>{props.price} ETB</p>

              </div>
          </div>
      </div>
    </Link>
    {
    /* <div className='productCard'>
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
    </div> */}

    </>
  );
}
