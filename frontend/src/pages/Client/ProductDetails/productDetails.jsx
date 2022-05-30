import { useState,useEffect } from 'react';
import './productDetails.css'
import axios  from 'axios';
import Topbar from '../../../components/Client/topbar/topbar'
import Footer from '../../../components/Client/footer/footer'
import RemoveOutlinedIcon from   '@material-ui/icons/RemoveOutlined';
import AddOutlinedIcon   from '@material-ui/icons/AddOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {  message } from 'antd';
import Button from '@material-ui/core/Button';
import AddShoppingCartOutlinedIcon from  '@material-ui/icons/AddShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from  '@material-ui/icons/FavoriteBorderOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart , addToCartRecord }  from '../../../redux/actions/cartActions';
import {addToWishlist} from '../../../redux/actions/wishlistAction'
import { fetchComments, getProductsById , submitComment }  from '../../../redux/actions/productActions';
import { useParams } from 'react-router-dom';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useCookies } from 'react-cookie';

//functions for tabs 

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-force-tabpanel-${index}`}
        aria-labelledby={`scrollable-force-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 0,
      width: '90%',
      backgroundColor: theme.palette.background.paper,
    },
  }));
  




  


export default function ProductDetails() {

    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [cookies, setCookie] = useCookies(['user']);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  

    const {id} = useParams();
    // console.log('id = ' + id);
    const dispatch = useDispatch();
    let product = [];
    
    useEffect(() => {
        console.log('in use effect detail');
        dispatch(getProductsById(id));        
    }, [dispatch]);
    
    const [allComments ,setAllComments] = useState([]);

    useEffect(()=>{
        const fetchComments = async ()=>{
          const response = await axios.post('http://localhost:5000/api/getComment', {id:id});
          console.log(response.data)
          setAllComments(response.data)          
        }
        fetchComments();
        console.log("the comments" + allComments);

        let productVisit = JSON.parse(sessionStorage.getItem("productVisit"));
        if(productVisit === null){
          productVisit = [];
          productVisit.push(id);
        }else{
          productVisit.push(id);
        }
        sessionStorage.setItem("productVisit", JSON.stringify(productVisit));
    },[])

	const produc = useSelector((state) => state.getProductsDetail.product);
    console.log(produc);    
    // const product = produc[0];
    console.log(product);
    // console.log(product[0]);

    // console.log({...produc[0], id});
    {produc.map((pro) => {
        product = pro;
        console.log(product);
	})}
    // console.log({...product[0].id});
    
    //handler state change in qty 
    const [qtyCounter , setQtyCounter] = useState(1);
    const [wishlistQty , setWishlistQty] = useState(1);
    
    //decrease the value of qty
    const handleMinQty = () =>{

        if(qtyCounter ===  1){
            alert("Minimum Quantity is : 1");
        }
        else{
            setQtyCounter(qtyCounter - 1);
        }

    }
    //increase the value if qty
    // add counter should only go as far as the ammount in stock , check validity
    const handlePlusQty =()=>{
        if(qtyCounter >= product.countInStock){
            alert("Maximum amount of product Available is:" + qtyCounter);
        }
        else{
            setQtyCounter( qtyCounter + 1);
        }
    }

    //adding to cart
    const addToCartHandler = () =>{
        if(product.countInStock === 0){
            alert("Product Not Available");
        }else{

            dispatch(addToCart(product.id , qtyCounter));
            if(!cookies.uid){
              dispatch(addToCartRecord(product.id,qtyCounter, null))
            }else{
              dispatch(addToCartRecord(product.id, qtyCounter, cookies.uid))
            }
            message.success("Added to Shopping Cart")
        }

        let cart = sessionStorage.getItem('addToCart');
        if(cart === null){
            cart = 1;
        }else{
            cart = Number(cart) + 1;
        }
        sessionStorage.setItem('addToCart', cart);
    }
    // adding to wishlist
    const addToWishlistHandler = ()=>{
        dispatch(addToWishlist(product.id))
        message.success("Added to wishlist")
    }

    const [comment , setComment ]= useState('');

    const commentHandler = () =>{      
        console.log(comment + " " + "product id :" + id);
        console.log("Users id : " + cookies.uid);

        if(comment === ''){
          message.error("Comment is Empty, please insert text");
        }else if(comment.length < 5){
          message.error("Comment is too short");
        }else if(!cookies.uid){
          message.warning("Please SignUp or Login to submit a comment");
        } else{
          dispatch(submitComment(comment , cookies.uid , id, product.productName))
          message.success("Comment submitted");
          setComment('');
        }



    }



  return (
     <> 
     <Topbar/>    
			<div className="productDetailView">
				<div className="productDetailsWrapper">
					<div className="productPathTitle">
						<p>    Home / {product.productName} </p>
					</div>

					<div className="productDetailsInfo">
						<div className="productDetailsInfoWrapper">
							<div className="productImageSide">
								<div className="productDetailImageHolder">
										<img src={product.productImg} />
								</div>
							</div>

							<div className="productDetailsSide">
								<div className="productDetailsContainer">
										<div className="productNameDetail">
												<p>{product.productName}</p>
										</div>
										<div className="productRatingDetail">
												<span>                   
														<StarBorderIcon style={product.rating >=1? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}} />
														<StarBorderIcon style={product.rating >=2? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
														<StarBorderIcon style={product.rating >=3? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
														<StarBorderIcon style={product.rating >=4? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
														<StarBorderIcon style={product.rating >=5? {color:'orange',fontWeight:'bolder'}: {color:'#80808066'}}/>
												</span>       
										</div>
										<div className="productPriceDetail">
												<p>{product.productPrice} ETB</p>  
										</div>
										<div className="productInfoDetail">                                    
												<p>Brand : {product.productBrand}</p>
												<p>Availability : {product.countInStock > 0? "In Stock" : "Out of Stock"} </p>
										</div>
										<div className="productDescriptionShortDetail">
														<p>{product.productDetail}</p>
										</div>
										<div className="productAddToStock">
												<p> Qty: <span> <RemoveOutlinedIcon onClick={handleMinQty} />
																		<input type="text"
																						min={0}
																						value={qtyCounter}
																								
																		/> <AddOutlinedIcon  onClick={handlePlusQty} /> 
																		
																</span>
												</p>
												<div className="productAddToStockButtonHolder">
														<Button variant='contained' type='primary'                                        
																onClick={addToCartHandler}
																startIcon={<AddShoppingCartOutlinedIcon/> }
																>                                        
																Add To Cart 
														</Button>
														<Button variant='outlined'    
																className='wishlist_btn'                                     
																onClick={addToWishlistHandler}
																startIcon={<FavoriteBorderOutlinedIcon /> }
																>                                        
																Add To WishList 
														</Button>
												</div>

												
												
										</div>
										{/* <div className="productAddToWishList">
												<FavoriteBorderOutlinedIcon />  <p>Add to Wish List </p>
										</div> */}
								</div>
							</div>
						</div>
					</div>
						<div className="productDetailDescriptions">

						</div>
				</div>
			</div>
        

        <div className="bottomTabContainer">       
					<div className={classes.root}>
            <AppBar position="static" color="default">
							<Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs">

              	<Tab label="Description"  {...a11yProps(0)} />
              	<Tab label="Reviews" {...a11yProps(1)}/>
  
            	</Tabs>
            </AppBar>

						<TabPanel value={value} index={0}>
								{product.productDetail}
						</TabPanel>

						<TabPanel value={value} index={1}>


                 {
                 !allComments?.length? <div></div>:                 
                 
                 allComments.map((comment, key)=>{
                   return(
                      <div className="some_review" key={comment.id}>
                      <div className="iconHolder">
                          <AccountBoxIcon/>                        
                      </div>
                      <div className="messageHolder">
                        <p>{comment.comment}</p>
                        <span>{comment.date}</span>
                      </div>
                  </div>
                   )
                 })

                 }     

               



             
							<TextareaAutosize 
										className='commentTextArea'
										aria-label="review product" 
										minRows={4} 
                    value={comment}
                    onChange={(e)=>setComment(e.target.value)}
										placeholder="Comment here ..." />

																<Button variant='outlined'    
																className='comment_btn'                                     
																onClick={commentHandler}                                        
																>                                        
																Submit
														</Button>
						</TabPanel>         
                
          </div>
        </div>
                
      
        <Footer/>
    </>
  )
}
