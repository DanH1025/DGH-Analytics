import React from 'react'
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

import BackgroundDim from '../backgroundDim/backgroundDim';

import SettingsIcon from '@material-ui/icons/Settings';

export default function Topbar() {

    const [Allcategory, setAllCategory] = React.useState(''); // for all the categories
    const [searchCategory , setSearchCategory]= React.useState(''); // search category selection
    const [open_category ,  setOpen_category] = React.useState(false);//open and close the select option for search 
    const [open_allCategories, setOpen_allCategories] = React.useState(false);//open and close the select option for all
    
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
    };
    
    //to handle when all category option closes
    const handleClose = () => {
      setOpen_allCategories(false);
    };
    //to handle when all category option opens
    const handleOpen = () => {
      setOpen_allCategories(true);
    };
    //to handle signup
    const signUpHandler = () =>{
       return <BackgroundDim />
     
    }

    //for the dialog
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };





   
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
                    <div className='signUp' onClick={handleClickOpen}>
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
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value={"television"}>TV</MenuItem>
                                    <MenuItem value={"smart phone"}>Smart Phone</MenuItem>
                                    <MenuItem value={"smart watch"}>Smart Watch</MenuItem>
                                    <MenuItem value={"PC"}>Computer</MenuItem>
                                    <MenuItem value={"Moniter"}>Moniter</MenuItem>
                                    <MenuItem value={"play station"}>PS</MenuItem>

                                </Select>
                           </FormControl>

                        </div>
                        <div className="searchInput">
                           <input  placeholder='Search...'
                           className='searchInputField' type="text" />
                        </div>
                    </div>
                    <div className="searchbtn">
                        <Search className='middleTopbarSearchIcon' fontSize='large'/>
                    </div>
                     
                </div>
                <div className="infos">
                        <div className='wishlist'>
                            <FavoriteBorderOutlined/>
                        </div>
                        <div className="cart">
                            <Link to='/cart'>
                               <ShoppingCartOutlined className='cartIcon' />
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
                                onChange={handleChange}
                                >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"television"}>TV</MenuItem>
                                <MenuItem value={"smart phone"}>Smart Phone</MenuItem>
                                <MenuItem value={"smart watch"}>Smart Watch</MenuItem>
                                <MenuItem value={"PC"}>Computer</MenuItem>
                                <MenuItem value={"Moniter"}>Moniter</MenuItem>
                                <MenuItem value={"play station"}>PS</MenuItem>
                            </Select>
                    </FormControl>
                    </div>
                    {/* <div className="bottomTopbar-right">
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
                    </div> */}
                  
                </div>
            </div>
        </div>

        <div className="signUpD">
            <Dialog open={open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send updates
                    occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDialogClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDialogClose} color="primary">
                    Subscribe
                </Button>
                </DialogActions>
            </Dialog> 
        
        
        </div>




    </div>
  )
}
