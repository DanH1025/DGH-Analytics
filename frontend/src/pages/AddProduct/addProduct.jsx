import React, { useState } from 'react';
import './addProduct.css';
import Axios from 'axios';
 

//import {ThemeProvider, makeStyles, createTheme} from '@material-ui/core/styles';
import { FormControl, Input, MenuItem, Select } from '@material-ui/core';
//import { TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';

// import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors';
  

// const theme = createTheme({
//   palette: {
//     primary: green,
//   },
//});
export default function AddProduct() {

    
    const [open_allCategories, setOpen_allCategories] = React.useState(false);//open and close the select option for all
    
    
   
    
    //to handle when all category option closes
    const handleClose = () => {
      setOpen_allCategories(false);
    };
    //to handle when all category option opens
    const handleOpen = () => {
      setOpen_allCategories(true);
    };
   
    //states to grab the changes on the input fields
    const [productName , setproductName] = useState('');
    const [productPrice , setproductPrice] = useState('');
    const [productBrand , setproductBrand] = useState('');
    const [productImg , setproductImg] = useState('');
    const [productCategory , setproductCategroy] = useState('');
    const [productDetail , setproductDetail] = useState('');

    //to handle the add product button 
    const addProductHandler = ()=>{
      Axios.post("http://localhost:5000/api/addToStock",
        {
         productName: productName , productPrice:productPrice,
         productBrand:productBrand ,productImg:productImg,
         productCategory:productCategory, productDetail:productDetail,
        
        }).then(alert("product added successfully"));
    }
    


    
  return (
      <div className='addProduct'>
        <div className="nav">
            <h4>Navbar to be Added</h4>
        </div>

        <div className='addProductWrapper'>
            <h1 className='title'>Add Product</h1>
            <div className="form_content">
                <div className='form'>
                    <div className="imageSide">

                    </div>
                    <div className="formSide">
                            <div className="productInfo">
                                <div className="content">                    
                                    <input onChange={(e)=>{
                                      setproductName(e.target.value);
                                    }} type="text" className='input' name='product_name' id='product_name' placeholder='Product Name' required />
                                    <input onChange={(e)=>{
                                      setproductPrice(e.target.value);
                                    }} type="number" className='input' name='product_price' id='product_price' placeholder='Price' required />
                                    <input onChange={(e)=>{
                                      setproductBrand(e.target.value);
                                    }} type="text" className='input' name='product_brand' id='product_brand' placeholder='Product Brand' required  />
                                    <input onChange={(e)=>{
                                      setproductImg(e.target.value);
                                    }} type="text" className='input' name='product_img' id='product_img' placeholder='Image URL' required />        
                   
                                    <FormControl variant='outlined' className='productFormControl'>  
                                        <InputLabel id="productCategorySelection">Product Category</InputLabel>
                                        <Select 
                                            labelId="productCategorySelection-items-lable"
                                            id="productCategorySelection-items"
                                            open={open_allCategories}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            onChange={(e)=>{
                                              setproductCategroy(e.target.value);
                                            }}
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
                            </div>

                            <div className="moreInfo">
                                <textarea onChange={(e)=>{
                                              setproductDetail(e.target.value);
                                            }} name="product_detail" id="product_detail" cols="50" rows="15" placeholder='Product Details' className='product_detail'></textarea>
                            </div>
                     
                    </div>
                </div>           
                <div className='buttons'>
                    <button className='addbtn' name='add_btn' id='add_btn' onClick={addProductHandler}>Add</button>
                    <button className='cancelbtn' name='cancel_btn' id='cancel_btn'>Cancel</button>
                </div>
            </div>        
        </div>    
      </div>        
  )
}
