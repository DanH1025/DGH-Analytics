import React, { useState, useEffect, useRef } from 'react'
import './topbar.css'
import {Link} from 'react-router-dom'
import {Phone, EventNote,Search,ShoppingCartSharp, FavoriteSharp, HistorySharp } from '@material-ui/icons'

// import HistoryIcon from '@mui/icons-material/History';

import FaceIcon from '@material-ui/icons/Face';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TvIcon from '@material-ui/icons/Tv';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WatchIcon from '@material-ui/icons/Watch';
import ComputerIcon from '@material-ui/icons/Computer';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
// import for the list item to select the categories

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {message} from 'antd'



//new topbar icone imports
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';



import { useCookies } from 'react-cookie';


import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getProductsByCategory ,recordProductSearch } from '../../../redux/actions/productActions';
import { getProductsBySearch } from '../../../redux/actions/productActions';
// import { getUser } from '../../../redux/actions/userActions'
// import { createUser } from '../../../redux/actions/userActions'

import { useNavigate } from "react-router-dom";

import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from 'antd';

export default function Topbar() {

    const [Allcategory, setAllCategory] = React.useState(''); // for all the categories
    const [searchCategory , setSearchCategory]= useState(''); // search category selection
    const [searchValue , setSearchValue]= useState(''); // search category selection
    const [open_category ,  setOpen_category] = useState(false);//open and close the select option for search 
    const [open_allCategories, setOpen_allCategories] = React.useState(false);//open and close the select option for all

    const userRef = useRef();
    const errRef = useRef();

    // useEffect(() => {
    //   userRef.current.focus();
    // }, [])

    
    // const [errMsg, setErrMsg] = useState('');
    // const [emailError, setEmailError] = React.useState('');
    
    // const [loginData , setloginData] = useState({
    //   email: "",
    //   password: ""
    // });
    
    // useEffect(() => {
    //   setErrMsg('');
    // }, [loginData.email, loginData.password])
    // const [signUpData , setSignUpData] = useState({
    //   first_name: "",
    //   last_name: "",
    //   email: "",
    //   confirm_email:"",
    //   password: "",
    //   confirm_password: "",
    // });

		const dispatch = useDispatch();

    const user = useSelector((state) => state.getUser.user);

    // to handle the changes on the search catagory option
    const handleSearchCategoryChange = (event)=>{
        setSearchCategory(event.target.value);
    }

    //to handle when the search category option closes
    const handleCloseSearchCategory = () =>{
        setOpen_category(false);
    }
    // //to handle hwen the search category option opens
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
      console.log('search handler');
      console.log(searchValue + "this is wat i searched for");
      console.log('category' + searchCategory);

      if(searchValue === '' && searchCategory === ''){
        dispatch(getProductsBySearch("", ""))
       // dispatch(recordProductSearch("",""))
        message.warn("Here are Random Items we found")
      }else if(searchValue === '' && searchCategory !== ''){
        dispatch(getProductsBySearch("", searchCategory))
       // dispatch(recordProductSearch("",searchCategory))
        message.warn("Here are the Categories we found")
      }
      
      else{  
          console.log(searchValue )      
           dispatch(getProductsBySearch(searchValue.searchValue, searchCategory));
          // dispatch(recordProductSearch(searchValue, searchCategory))

      }

      
      
    }

    //for the dialog
    
    // const [openLogin, setOpenLogin] = React.useState(false);
    // const [openSignUp, setOpenSignUp] = React.useState(false);

    // const handleClickOpenLogin = () => {
    //     setOpenSignUp(false);
    //     setOpenLogin(true);
    // };
    // const handleClickOpenSignUp = () =>{
    //     setOpenLogin(false)
    //     setOpenSignUp(true);
    // }

    // const handleDialogClose = () => {
    //   dispatch(getUser(loginData.email, loginData.password));
    //   console.log(user);
    //   if(user?.userId){
    //     setOpenSignUp(false);
    //     setOpenLogin(false);
    //     console.log(loginData);
    //     loginData.email = "";
    //     loginData.password = "";
    //   }else{
    //     console.log('no data incorect');
    //     setErrMsg('Incorrect login');
    //     setOpenSignUp(false);
    //     setOpenLogin(false);
    //   }
    // };

    // const handleRegisterDialogClose = () => {
    //   if((signUpData.email === signUpData.confirm_email)&&(signUpData.password === signUpData.confirm_password)){
    //     // validateEmail(signUpData.email);
    //     // console.log(emailError);
    //     fetch(`http://apilayer.net/api/check?access_key=e88cb97fc068e62599ee94d965979c19&email=${signUpData.email}&smtp=1&format=1`).
    //     then(res => res.json()).
    //     then(data => {
    //       console.log(data.format_valid);
    //       if (data.format_valid && data.smtp_check) {  
    //         console.log(signUpData);
    //         dispatch(createUser(signUpData));
    //         setOpenSignUp(false);
    //         setOpenLogin(false);
    //         setEmailError('false');
    //       }else{
    //         console.log('incorrect email format');
    //         setEmailError('true');
    //       }
    //     });
    //   }else{
    //     console.log('wrong input');
    //   }
    // };



    //track cart and wishlist span numbers 
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const wishlist = useSelector(state => state.wishlist);
    const {wishlistItems} = wishlist;

    //get the cart counter value for the cart icon
    const getCartCount = ()=>{
      return cartItems.reduce((qtyCounter, item)=> qtyCounter + Number(item.qtyCounter) ,0)
    }
    //get the wishlist counter valuie for the wishlist icon
    const getWishlistCount = ()=>{
      return wishlistItems.length
    }
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    const logoutHandler = () => {
      let expires = new Date();
      // expires.setTime(expires.getTime() + (2 * 10))
      // setCookie('uid', '', {path: '/', expires})
      // setCookie('fname', '', {path: '/', expires})
      // setCookie('lname', '', {path: '/', expires})
      // setCookie('phoneNo', '', {path: '/', expires})
      // setCookie('access_token', '', { path: '/',  expires})
      removeCookie('uid', { path: '/' });
      removeCookie('fname', { path: '/' });
      removeCookie('lname', { path: '/' });
      removeCookie('phoneNo', { path: '/' });
      removeCookie('access_token', { path: '/' });
      removeCookie();
      setFname('');
      setLname('');
      setPhoneNo('');
      window.location.reload(false);
      navigate('/')
    }
   
    const [isAuth , setIsAuth] = useState(false);

    const [fname , setFname] = useState('');
    const [lname , setLname] = useState('');
    const [phoneNo , setPhoneNo] = useState('');

    useEffect(() => {
      setValues();
      if(fname === undefined){
        setFname('');
      }
      console.log(fname);
      console.log(lname);
      console.log(phoneNo);
    }, [dispatch])

    const setValues = () => {
      setFname(cookies.fname);
      setLname(cookies.lname);
      setPhoneNo(cookies.phoneNo);
    }

    
  return (
    <>

        <div className="topbar">
          <div className="Header">
            <div className="topSide">
              <div className="topSideWrapper">
                <div className="leftSide">
                   
                       <a href="https://www.instagram.com/?hl=en"> <InstagramIcon   style={{color:"red"}} /></a>
                       <a href="https://www.facebook.com/">  <FacebookIcon  style={{color:"#3b3b8f"}} /></a>
                        <a href="https://twitter.com/?lang=en"><TwitterIcon   style={{color:"#00a9ff"}} /></a>
                 

                </div>

                <div className="rightSide">
                {
                  cookies.uid ?
                     <div className="trackorderHolder">
                      <Link to='/orderlist'>
                        <p>Track your Order</p>
                      </Link>                    
                    </div>           
                      
                 : '' 
                }
                
                  {cookies.fname ?                      
                    <div className='isLoggedIn'>
                      <div className="profilePic"> 
                        <AccountCircleIcon/>
                      </div>
                      <div className='profile_info'>
                        <span>  
                          {cookies.fname} {cookies.lname} 
                          {/* {fname} {lname} */}
                        </span>
                        <span>{
                          cookies?.phoneNo 
                          ? '+251'
                          : ''
                        } 
                           {
                          cookies?.phoneNo 
                          ? cookies?.phoneNo
                          : cookies?.email
                        }
                        {/* <span>{phoneNo} */}
                        </span>
                          
                      </div>
                        

                      <Button className="logout_btn" size='small' variant="outlined" color="secondary"
                      onClick={logoutHandler}>
                        Logout
                      </Button>
                    </div>                         
                        : 
                    <div className="login_btn_container" >  
                    <Link to={'/login'}>
                      <Button className='login_btn' size='small' variant="outlined" color="primary">
                        Login
                      </Button>
                    </Link>              
                    </div>
                  }
                </div>
              </div>
            </div>
            <div className="bottomSide">
              <div className="logoSide">                
                <img
                  src="https://cdn-icons-png.flaticon.com/512/732/732204.png" />
                  <p>
                    <prev>
                      DGH 
                    </prev>
                  </p>                  
                  <p>Analytics</p>
                  <span>
                    <prev>
                      shop
                    </prev>
                  </span> 
              </div>
              <div className="searchBarSide">
                <div className="searchBarWrapper">                 
                  <div className="category">
                    <FormControl variant="outlined" className='searchCategoryForm'>                    
                      <Select className='searchCategorySelect'
                          labelId='searchCategory-items-lable'
                          id='searchCategory-items'
                          displayEmpty="true"
                          open={open_category}
                          onClose={handleCloseSearchCategory}
                          onOpen={handleOpenSearchCategory}
                          value={searchCategory}
                          onChange={handleSearchCategoryChange}
                      >
                        <MenuItem  className='allCategoryMenuItem' value="">
                              Category
                        </MenuItem>
                        <MenuItem className='allCategoryMenuItem' value={"television"}>
                          <TvIcon className='menuItemIcons' /> TV </MenuItem>
                          <MenuItem  className='allCategoryMenuItem' value={"smart phone"}>
                        <PhoneAndroidIcon className='menuItemIcons' /> 	Smart Phone </MenuItem>
                        <MenuItem  className='allCategoryMenuItem' value={"smart watch"}>
                          <WatchIcon className='menuItemIcons' /> Smart Watch </MenuItem>
                        <MenuItem  className='allCategoryMenuItem' value={"laptop"}>
                        <ComputerIcon className='menuItemIcons' /> Computer </MenuItem>
                        <MenuItem  className='allCategoryMenuItem' value={"moniter"}>
                        <DesktopMacIcon className='menuItemIcons' /> Moniter</MenuItem>
                        <MenuItem  className='allCategoryMenuItem' value={"play station"}>
                        <SportsEsportsIcon className='menuItemIcons'/>PS</MenuItem>
                      </Select> 
                    
                    </FormControl>
                  </div>
                  <div className="searchInput">
                    <input  
                    placeholder='Search' 
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
                  <div className="searchbtn">
                      <Link to='/search' className='searchbtnLink'>
                          <Search 
                          onClick={handleSearch}/>
                    </Link> 
                  </div>
                </div>
              </div>
            </div>
          </div>        
        </div>
        <div className="stickyHeader">
          <div className="stickyContent">
            <div className="stickyLeft">
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

            <div className="stickyRight">
              <div className='orderlist'>
               
              </div>
              <div className='wishlist'>
                <Link to='/wishlist'>
                  <FavoriteSharp className='infosIcons' label="Wishlist"/>
                    <span>{getWishlistCount()}</span>
                </Link>
              </div>
              <div className="cartIconHolder">
                <Link to='/cart'>  
                  <ShoppingCartSharp className='infosIcons' />   
                  <span>{getCartCount()}</span>
                </Link>  
              </div>
            </div>
              
          </div>
      </div>
    </>






  )
}
