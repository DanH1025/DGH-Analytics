import React, {useEffect} from 'react'
import './addProduct.css'

import { v4 } from 'uuid';
//imports for image uploader

import { useState } from 'react';
import { Upload } from 'antd';

import { Input,Button } from 'antd';

import { Divider,  Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';

import {MenuItem, Select} from '@mui/material';

import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
// import UseStorage from '../firebase/useStorage';

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/config";

import { projectStorage, projectFirestore, timestamp } from '../firebase/config';

import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../../../redux/actions/productActions';
import { getCagegory } from '../../../redux/actions/categoryActions';

import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

// const { Option } = Select;

// https://i5.walmartimages.com/asr/076705ce-1368-4a07-98ce-91fe3589f24b.50ad01b1b2a6404a1a041160d0ad031d.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF
// https://m.media-amazon.com/images/I/81mFSlcmWqL._AC_UY500_.jpg

export default function AddProduct() {
    
	const [fileList, setFileList] = useState([1]);
	const dispatch = useDispatch();
	const [productData, setProductData] = useState({
			productName: "",
			productBrand: "",
			productCategory: "",
			productImg: "",
			productPrice: 0,
			productSKU: '',
			productCostPrice: 0,
			amount: '',
			productDetail: ""
	})
	
	useEffect(() => {
		dispatch(getCagegory());
	}, [])

	const categories = useSelector((state) => state.getCategory.categories);
	console.log(categories);

	const [imgPreview, setImgPreview] = useState('https://img.icons8.com/color/344/gallery.png');

	const onChange = async(e) => {

		// setFileList(newFileList);
		// const {url} = UseStorage(newFileList[0]);
		const file = e.target.files[0];
		console.log(file);
		 let url;
		// 	//
			if (!file) return;
		// 	const sotrageRef = ref(storage, `image/${file.name}`);
		// 	const uploadTask = uploadBytesResumable(sotrageRef, file);
  
		// 	uploadTask.on(
		// 		"state_changed", null, 
		// 		(error) => console.log(error),
		// 		() => {
		// 				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
		// 					console.log(downloadURL);
		// 				});
		// 			}
		// 	);

		// 	// () => {
		// 	// 	getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
		// 	// 		console.log(downloadURL);
		// 	// 	});
		// 	// }
		// // const {url} = imageUploader(newFileList.at(-1))	

		const storageRef = projectStorage.ref(`imageProduct/${file.name}`);
    const collectionRef = projectFirestore.collection('images');
    
    storageRef.put(file).on('state_changed', null, 
		(err) => {
      console.log(err);
    }, async () => {
      url = await storageRef.getDownloadURL();
	  setImgPreview(url);
      const createdAt = timestamp();
      await collectionRef.add({ url, createdAt });
      console.log(url);
			setProductData({
				...productData, 
				productImg: url
				}
			)
    });
	
		console.log('url: ' + url);
	};
  
	// const onPreview = async file => {
	// 	let src = file.url;
	// 	if (!src) {
	// 		src = await new Promise(resolve => {
	// 			const reader = new FileReader();
	// 			reader.readAsDataURL(file.originFileObj);
	// 			reader.onload = () => resolve(reader.result);
	// 		});
	// 	}
	// 	const image = new Image();
	// 	image.src = src;
	// 	const imgWindow = window.open(src);
	// 	imgWindow.document.write(image.outerHTML);
	// };

	//for selecting brand
	
	const [brands, setBrands] = useState([
			"Samsung","Apple" ,"LG" , "TCL" , "Nokia" , "Oppo" , "Techno"
	]);
	const [newBrand, setNewBrand] = useState('');

	const onBrandChange = event => {
		setNewBrand(event.target.value);
	};

	const addBrandItem = e => {
			//reloads only the brand list view so checkout when api is done
		e.preventDefault();
		if(newBrand === ""){
				alert("No Brand inserted");
		}
		else{
				setBrands([...brands, newBrand]);
				setNewBrand('');
		}
	};

		//for selecting category
	const [category, setCategory] = useState([
			"TV", "Smart-Phone" , "Smart-Watch" , "PS" , "Moniter" , "Computer"
	]);
	const [newCategory, setNewCategory] = useState('');

	const onCategoryChange = event => {
		setNewCategory(event.target.value);
	};

	const addCategoryItem = e => {
			//reloads only the brand list view so checkout when api is done
		e.preventDefault();
		if(newCategory === ""){
				alert("No Category inserted");
		}
		else{
				setCategory([...category, newCategory]);
				setNewCategory('');

		}
	};
  
	const { TextArea } = Input;
    //add product button loading state
  
	const handleSubmit = () => {
		if(fileList?.length){
			console.log(productData);
			console.log(fileList);
			dispatch(createProduct(productData));
			setProductData({
				productName: "",
				productBrand: "",
				productCategory: "",
				productImg: "",
				productPrice: 0,
				productSKU: '',
				productCostPrice: 0,
				amount: '',
				productDetail: ""
			})
			setImgPreview('https://img.icons8.com/color/344/gallery.png')
		}else {
			console.log('no photo');
		}
	}

  return (
    <div className='add_product'>
		<div className="add_product_wrapper">
			<div className="information">
				<div className="form_side">
					<div className="form_wrapper">

						<div className="aboutProduct_holder">
							<div className="aboutProduct_container">
								<p>Name </p>
								<input 
									className='product_name_input' 
									type='text' 
									placeholder="Product Name"
									value={productData.productName}
									onChange = {(e) => {
										setProductData({
											...productData, 
												productName: e.target.value
											}
										)
								  }} />
							</div>
							<div className="aboutProduct_container">
								<p>Description</p>
								<textarea 
									className='product_detail_input' 
									placeholder='Product Description' 
									type='text' 
									rows={8}
									value={productData.productDetail}
									onChange = {(e) => {
											setProductData({
													...productData, 
													productDetail: e.target.value
												}
										)
								}} />
							</div>
						</div>

						<div className="productPricing_holder">
							<h3>Pricing</h3>
							<div className="productPricing_container">
								<p>Price </p>
								<input type="number"
									min={0}
									className='product_price'
									placeholder='Price'
									value={productData.productPrice}
									onChange = {(e) => {
										setProductData({
											...productData, 
												productPrice: e.target.value
											}
										)
								  }} />
							</div>
							<div className="productPricingCalculator_holder">
								<div className="productPricingCalculator_container">
								    <p>Cost per items </p>
									<input type="number"
										min={0}
										className='product_price'
										placeholder='Price'
										value={productData.productCostPrice}onChange = {(e) => {
											setProductData({
												...productData, 
													productCostPrice: e.target.value
												}
											)
										}}/>
								</div>
								<div className="productPricingCalculator_container">
									<p>Margin</p> 
									<span>{productData.productPrice === 0 || productData.productPrice === 0 || productData.productPrice === '' ? 0:  ((productData.productCostPrice / productData.productPrice)*100).toFixed(2) > 100? 'Unbalanced':((productData.productCostPrice / productData.productPrice)*100).toFixed(2)} %</span>
								</div>
								<div className="productPricingCalculator_container">
									<p>Profit</p> 
									<span>{   (productData.productPrice - productData.productCostPrice) < 0 ? 'Unbalanced' : (productData.productPrice - productData.productCostPrice)} ETB</span>
								</div>
							</div>
						</div>
						
						<div className="productInventory_holder">
							<h3>Inventory</h3>
							<div className="productInventory_container">
							  <p>Stock Keeping Unit</p>
								<input type="number"
										min={0}
										className='product_price'
										placeholder='SKU'
										value={productData.amount}
										onChange = {(e) => {
											setProductData({
												...productData, 
													amount: e.target.value
												}
											)
										}}/>
										<br />
								<Checkbox> <p> Keep track of inventory </p></Checkbox>
							</div>
						</div>
						
						<div className="productBrand_holder">
							<div className="productBrand_container">
								<p>Category</p> 
								{/* <input type="text" 
									className='product_chategory'
									placeholder='Chategory'
									value={productData.productCategory}
									onChange = {(e) => {
										setProductData({
											...productData, 
												productCategory: e.target.value
											}
										)
								  }} /> */}
								
								<Select
                value={productData.productCategory}
                onChange={(e) => {
									setProductData({
										...productData, 
											productCategory: e.target.value
										} ) 
								}}
								// defaultValue={categories[0].ctgr_title}
								label="Category"
								labelId="demo-simple-select-label"
                // inputProps={{ 'aria-label': 'Without label' }}
								>
                  {categories?.map((item) => {
                    return(
                      <MenuItem value={item.ctgr_value}>{item.ctgr_title}</MenuItem>
                  )}) }
                </Select> 

							</div>

							<div className="productBrand_container">
								<h3>Brand</h3> 
								<input type="text" 
										className='product_brand'
										placeholder='Brand'
										value={productData.productBrand}
										onChange = {(e) => {
											setProductData({
												...productData, 
													productBrand: e.target.value
												}
											)
										}} />
							</div>
						</div>

						<div className="productMedia_holder">
							<h3>Media</h3>
							</div>
							<div className="productMedia_container">
								<input type="file" onChange={onChange} />
							<div className="productMediaImage_container">
								<div className="imagePreviewHolder">								

									  <img  src={imgPreview} alt={productData.productName}  />
								

								</div>

							</div>
						</div>

						<div className="buttonHolder">
							<button className='add_product_btn' onClick={handleSubmit} >Add Product</button>
							<button className='add_product_cancel_btn'>Cancel</button>
						</div>

					</div>
				</div>

				{/* <div className="image_side item">
					<div className="image_side_wrapper">
						<div className='row'>
							<input type="file" onChange={onChange} />
						</div>
						<div className="row">
						<img src={imgPreview}  />

						</div>
					</div>
				</div> */}
			</div>

			{/* <div className="buttonHolder">
				<button className='add_product_btn' onClick={handleSubmit} >Add Product</button>
				<button className='add_product_cancel_btn'>Cancel</button>
			</div> */}
			
		</div>
    </div>
  )
}















// <div className="add_product_wrapper">
// 				<div className="upload_img">
// 					<input type="file" onChange={onChange} />
// 					{/* <Upload
// 						action=""
// 						listType="picture-card"
// 						fileList={fileList}
// 						onChange={onChange}
// 						onPreview={onPreview}>
// 						{fileList.length < 5 && '+ Upload'}
// 					</Upload> */}
// 				</div>
// 				<div className="upload_info">
// 					<div className='pName'>
// 						<Input 
// 							className='product_name_input' 
// 							type='text' 
// 							placeholder="Product Name"
// 							value={productData.name}
// 							onChange = {(e) => {
// 									setProductData({
// 											...productData, 
// 											productName: e.target.value
// 										}
// 									)
// 							}} />
// 					</div>   

// 					<Select
// 						className='product_brand_select'
// 						placeholder="Product Brand"
// 						value={productData.productBrand}
// 						onChange = {(e) => {
// 							setProductData({
// 								...productData, 
// 								productBrand: e
// 								}
// 							)
// 						}}
// 						dropdownRender={menu => (
// 							<>
// 								{menu}
// 									<Divider style={{ margin: '8px 0' }} />
// 									<Space align="center" style={{ padding: '0 8px 4px' }}>
// 											<Input placeholder="Insert New Brand" value={newBrand} onChange={onBrandChange} />
// 											<Typography.Link onClick={addBrandItem} style={{ whiteSpace: 'nowrap' }}>
// 											<PlusOutlined /> Add Brand
// 											</Typography.Link>
// 									</Space>
//               </>
//             )}>
// 						{brands.map(item => (
// 								<Option key={item}>{item}</Option>
// 						))}
// 					</Select>
             
// 					<Select
// 						className='product_category_select'
// 						placeholder="Product Category"
// 						value={productData.productCategory}
// 						onChange = {(e) => {
// 								setProductData({
// 										...productData, 
// 										productCategory: e
// 								}
// 							)
// 						}}
// 						dropdownRender={menu => (
// 							<>
// 								{menu}
// 								<Divider style={{ margin: '8px 0' }} />
// 								<Space align="center" style={{ padding: '0 8px 4px' }}>
// 										<Input placeholder="Insert New Product Category" value={newCategory} onChange={onCategoryChange} />
// 										<Typography.Link onClick={addCategoryItem} style={{ whiteSpace: 'nowrap' }}>
// 										<PlusOutlined /> Add Category
// 										</Typography.Link>
// 								</Space>
// 							</>
// 						)}>
// 						{
// 							category.map(item => (
// 								<Option key={item}>{item}</Option>
// 							))
// 						}
// 					</Select>
              
// 					<div className='pPrice'>
// 							<Input 
// 								className='product_price_input' 
// 								prefix="$"  
// 								type='number' 
// 								placeholder="Price" 
// 								value={productData.productPrice}
// 								onChange = {(e) => {
// 									setProductData({
// 											...productData, 
// 											productPrice: e.target.value
// 										}
// 									)
// 							}}/>
// 					</div>

// 					<div className='pAmount'>
// 							<Input 
// 								className='product_amount_input' 
// 								prefix="#"  
// 								type='number' 
// 								placeholder="Amount in Stock"
// 								value={productData.amount}
// 								onChange = {(e) => {
// 										setProductData({
// 												...productData, 
// 												amount: e.target.value
// 											}
// 										)
// 								}} 
// 							/>
// 					</div>

// 					<div className='pDetail'>
// 						<TextArea 
// 							className='product_detail_input' 
// 							placeholder='Product Description'  
// 							rows={8}
// 							value={productData.productDetail}
// 							onChange = {(e) => {
// 									setProductData({
// 											...productData, 
// 											productDetail: e.target.value
// 										}
// 									)
// 							}} />
// 					</div>  

//         </div>
//       </div>

// 			<div className="buttonHolder">
// 					<Button
// 							className='add_product_btn'   
// 							icon={<AddCircleOutlineOutlinedIcon />}
// 							onClick={handleSubmit}>
// 							Add to Stock
// 					</Button>
// 					<Button
// 							className='add_product_cancel_btn'
// 							type='primary'  >
// 							Cancel
// 					</Button>
// 			</div>