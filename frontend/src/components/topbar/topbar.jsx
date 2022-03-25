import React, { useEffect, useState } from 'react'
import './topbar.css'
import {Link} from 'react-router-dom'
import {Phone, EventNote,Search,ShoppingCartOutlined, FavoriteBorderOutlined } from '@material-ui/icons'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';




// import for the list item to select the categories
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductsByCategory } from '../../redux/actions/productActions';
import { getProductsBySearch } from '../../redux/actions/productActions';
import { getUser } from '../../redux/actions/userActions'
import { createUser } from '../../redux/actions/userActions'

import SettingsIcon from '@material-ui/icons/Settings';

export default function Topbar() {

    const [Allcategory, setAllCategory] = React.useState(''); // for all the categories
    const [searchCategory , setSearchCategory]= React.useState(''); // search category selection
    const [searchValue , setSearchValue]= 
    React.useState(''); // search category selection
    const [open_category ,  setOpen_category] = React.useState(false);//open and close the select option for search 
    const [open_allCategories, setOpen_allCategories] = React.useState(false);//open and close the select option for all
    
    const [loginData , setloginData] = useState({
      email: "",
      password: ""
    });

    const user = useSelector((state) => state.getUser.user);

    const [signUpData , setSignUpData] = useState({
      first_name: "",
      last_name: "",
      email: "",
      confirm_email:"",
      password: "",
      confirm_password: "",
    });

		const dispatch = useDispatch();

    // to handle the changes on the search catagory option
    const handleSearchCategoryChange = (event)=>{
        setSearchCategory(event.target.value);
    }
    //to handle when the search category option closes
    const handleCloseSearchCategory = () =>{
        setOpen_category(false);
    }
    //to handle hwen the search category option opens
    const handleOpenSearchCategory = () =>{
        setOpen_category(true);
    }
    //to handle the changes on all the catagories changing on the home page
    const handleChange = (event) => {
      setAllCategory(event.target.value);
			console.log('in top bar' + event.target.value);
			if(event.target.value === ''){
				dispatch(getProducts());
			}else{
				dispatch(getProductsByCategory(event.target.value));
			}
    };
    
    //to handle when all category option closes
    const handleClose = () => {
      setOpen_allCategories(false);
    };
    //to handle when all category option opens
    const handleOpen = () => {
      setOpen_allCategories(true);
    };

    const handleSearch = () => {
      // console.log('search handler');
      // console.log(searchValue.searchValue);
      // console.log('category' + searchCategory);
      dispatch(getProductsBySearch(searchValue.searchValue, searchCategory));

    }
 

    //for the dialog
    
    const [openLogin, setOpenLogin] = React.useState(false);
    const [openSignUp, setOpenSignUp] = React.useState(false);

    const handleClickOpenLogin = () => {
        setOpenSignUp(false);
        setOpenLogin(true);
    };
    const handleClickOpenSignUp = () =>{
        setOpenLogin(false)
        setOpenSignUp(true);
    }

    const handleDialogClose = () => {
      dispatch(getUser(loginData.email, loginData.password));
      console.log(user);
      if(user === ""){
        setOpenSignUp(false);
        setOpenLogin(false);
        console.log(loginData);
        loginData.email = "";
        loginData.password = "";
      }else{
        console.log('no data incorect');
      }
    };
    const handleRegisterDialogClose = () => {
      if((signUpData.email === signUpData.confirm_email)&&(signUpData.password === signUpData.confirm_password)){
        setOpenSignUp(false);
        setOpenLogin(false);
        console.log(signUpData);
        dispatch(createUser(signUpData));
      }else{
        console.log('wrong input');
      }
    };


    //track cart and wishlist span numbers 
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    //get the cart counter value for the cart icon
    const getCartCount = ()=>{
      return cartItems.reduce((qtyCounter, item)=> qtyCounter + Number(item.qtyCounter) ,0)
    }

   
  return (
    <div className='topbar'>
        <div className="topbarWrapper">
          <div className="upperTopbar">

            <div className="upperTopbar_left">
              <div className="currency">
							Currency: ETB 
            	</div>
          	</div>

          	<div className="upperTopbar_right">
          	  <div className='orderNowInfo'>
								<Phone className='upperTopbarIcon' /> Order Now , Shipped Today - Support:(+251)935123440
          	  </div>|
          	  <div className='trackOrder'>
								<EventNote className='upperTopbarIcon' /> <a href='#'>Track Your Order</a> 
          	  </div>|
          	  <div className='signUp' onClick={handleClickOpenLogin}>
								<SettingsIcon/> Setting
          	  </div>               
          	</div>

          </div>
            <hr className='bnUM' />
            <div className="middleTopbar">
              <div className="search">
                <div className="searchWrapper">
                	<div className="category">
										<FormControl variant="outlined" className='searchCategoryForm'>
										<InputLabel id="searchcategoryLable"><h4 className="searchCategoryLable">Category</h4></InputLabel>
										<Select className='searchCategory'
										labelId='searchCategory-items-lable'
										id='searchCategory-items'
                	  open={open_category}
                	  onClose={handleCloseSearchCategory}
                	  onOpen={handleOpenSearchCategory}
                	  value={searchCategory}
                	  onChange={handleSearchCategoryChange}
                	    >
                	      <MenuItem value=""><em>
													None</em></MenuItem>
                	      <MenuItem value={"television"}>
													TV</MenuItem>
                	      <MenuItem value={"smart phone"}>
													Smart Phone</MenuItem>
                	      <MenuItem value={"smart watch"}>
													Smart Watch</MenuItem>
                	      <MenuItem value={"PC"}>
													Computer</MenuItem>
                	      <MenuItem value={"Moniter"}>
													Moniter</MenuItem>
                	      <MenuItem value={"play station"}>
													PS</MenuItem>
                	  	</Select>
                	  </FormControl>
                	</div>
								<div className="searchInput">
									<input  
                    placeholder='Search...'
										className='searchInputField' 
                    name='search'
                    value={searchValue.task}
                    onChange={(e) => {
                      let value = {task: e.target.value}
                      let search = value.task;
                      console.log(search);
                      setSearchValue({
                        searchValue: search 
                      })
                    }   
                    }
                    type="text" />
								</div>
							</div>
              <div className="searchbtn">
                <Link to='/search'>
                  <Search className='middleTopbarSearchIcon' fontSize='large'
                  onClick={handleSearch}/>
                </Link> 
              </div>
            </div>
            <div className="infos">
              <div className='wishlist'>
								<FavoriteBorderOutlined/> <span>0</span>
              </div>
              <div className="cart">
								<Link to='/cart'>
									<ShoppingCartOutlined className='cartIcon' /> <span>{getCartCount()}</span>
								</Link>  
              </div>
            </div>
          </div>
         
            <div className="bottomTopbar">
							<div className="bottomTobbarWrapper">
								<div className="bottomTopbar-left">
									<FormControl className='allCategorySelection'>
										<InputLabel id="allCategorySelection"><h3 className='allCategoryLable'>All Categories</h3></InputLabel>
										<Select className='allcategory'
											labelId="allCategorySelection-items-lable"
                      id="allCategorySelection-items"
                      open={open_allCategories}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={Allcategory}
                      onChange={handleChange}>
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"television"}>
													TV</MenuItem>
                        <MenuItem value={"smart phone"}>
													Smart Phone</MenuItem>
                        <MenuItem value={"smart watch"}>
													Smart Watch</MenuItem>
                        <MenuItem value={"PC"}>
													Computer</MenuItem>
                        <MenuItem value={"Moniter"}>
													Moniter</MenuItem>
                        <MenuItem value={"play station"}>
													PS</MenuItem>
                    </Select>
                  </FormControl>
                    </div>
                    <div className="bottomTopbar-right">
                    <ul className='lowerSelection'>
                        <Link to='/'>
                            <li className='lowerSelectionItem'>Home</li>
                        </Link>
                        <Link to='/about'>
                            <li className='lowerSelectionItem'>About</li>
                        </Link>
                        <Link to='/contactUs'>
                            <li className='lowerSelectionItem'>Contact Us</li>
                        </Link>                        
                    </ul>
                    </div>
                  
                </div>
            </div>
        </div>

        <div className="signUpDialog">
            <Dialog 
              open={openLogin} 
              onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                  Login</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Im A Returning Customer 
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="loginEmail"
                    label="Email Address"
                    type="email"
                    value={loginData.email}
                    onChange={(e)=>{
                      setloginData({...loginData, email: e.target.value})
                    }}
                    fullWidth
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="loginPasswor"
                    label="Password"
                    type="password"
                    value={loginData.password}
                    onChange={(e)=>{
                      setloginData(
                        {...loginData, 
                        password: e.target.value})
                    }}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button 
                onClick={handleDialogClose} variant='outlined'  
                color="primary">
                    Login
                </Button>
                <Button onClick={handleClickOpenSignUp} variant='outlined' color="primary">
                    Create an Account
                </Button>
                </DialogActions>
            </Dialog> 


            <Dialog open={openSignUp} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">SignUp</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    Im A New Customer
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="first_name"
                    label="First Name"
                    type="text"
                    value={signUpData.first_name}
                    onChange={(e)=>{
                      setSignUpData({...signUpData, first_name: e.target.value})
                    }}
                    fullWidth
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="last_name"
                    label="Last Name"
                    type="text"
                    value={signUpData.last_name}
                    onChange={(e)=>{
                      setSignUpData({...signUpData, last_name: e.target.value})
                    }}
                    fullWidth
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="Email"
                    label="Email"
                    type="email"
                    value={signUpData.email}
                    onChange={(e)=>{
                      setSignUpData({...signUpData, email: e.target.value})
                    }}
                    fullWidth
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="confirm_email"
                    label="Confirm Email"
                    type="email"
                    value={signUpData.confirm_email}
                    onChange={(e)=>{
                      setSignUpData({...signUpData, confirm_email: e.target.value})
                    }}
                    fullWidth
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    value={signUpData.password}
                    onChange={(e)=>{
                      setSignUpData({...signUpData, password: e.target.value})
                    }}
                    fullWidth
                />
                 <TextField
                    autoFocus
                    margin="dense"
                    id="confirm_password"
                    label="Confirm Password"
                    type="password"
                    value={signUpData.confirm_password}
                    onChange={(e)=>{
                      setSignUpData({...signUpData, confirm_password: e.target.value})
                    }}
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleRegisterDialogClose} variant='outlined'  color="primary">
                    Register
                </Button>
                <Button onClick={handleClickOpenLogin} variant='outlined' color="primary">
                    Login
                </Button>
                </DialogActions>
            </Dialog> 
        
        
        </div>




    </div>
  )
}
