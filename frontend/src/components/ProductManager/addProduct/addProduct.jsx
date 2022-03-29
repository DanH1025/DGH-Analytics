import React from 'react'
import './addProduct.css'

//imports for image uploader

import { useState } from 'react';
import { Upload } from 'antd';

import { Input,Button } from 'antd';

import { Select, Divider,  Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PoweroffOutlined } from '@ant-design/icons';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const { Option } = Select;

let index = 0;



export default function AddProduct() {
    
    const [fileList, setFileList] = useState([1]);

  

    const onChange = ({ fileList: newFileList }) => {
      setFileList(newFileList);
    };
  
    const onPreview = async file => {
      let src = file.url;
      if (!src) {
        src = await new Promise(resolve => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow.document.write(image.outerHTML);
    };


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
  

  return (
    <div className='add_product'>
        <div className="add_product_wrapper">
    
            <div className="upload_img">
                    <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                
                    >
                    {fileList.length < 5 && '+ Upload'}
                    </Upload>
            </div>
            <div className="upload_info">
                <div className='pName'>
                    <Input className='product_name_input' type='text' placeholder="Product Name" />
                </div>

                <div className='pBrand'>
                    <Select
                            className='product_brand_select'
                            placeholder="Product Brand"
                            dropdownRender={menu => (
                                <>
                                {menu}
                                <Divider style={{ margin: '8px 0' }} />
                                <Space align="center" style={{ padding: '0 8px 4px' }}>
                                    <Input placeholder="Insert New Brand" value={newBrand} onChange={onBrandChange} />
                                    <Typography.Link onClick={addBrandItem} style={{ whiteSpace: 'nowrap' }}>
                                    <PlusOutlined /> Add Brand
                                    </Typography.Link>
                                </Space>
                                </>
                            )}
                            >
                            {brands.map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                </div>
                <div className='pCategory'>
                    <Select
                            className='product_category_select'
                            placeholder="Product Category"
                            dropdownRender={menu => (
                                <>
                                {menu}
                                <Divider style={{ margin: '8px 0' }} />
                                <Space align="center" style={{ padding: '0 8px 4px' }}>
                                    <Input placeholder="Insert New Product Category" value={newCategory} onChange={onCategoryChange} />
                                    <Typography.Link onClick={addCategoryItem} style={{ whiteSpace: 'nowrap' }}>
                                    <PlusOutlined /> Add Category
                                    </Typography.Link>
                                </Space>
                                </>
                            )}
                            >
                            {category.map(item => (
                                <Option key={item}>{item}</Option>
                            ))}
                        </Select>
                </div>
                <div className='pPrice'>
                    <Input className='product_price_input' prefix="$"  type='number' placeholder="Price" />
                </div>
                <div className='pAmount'>
                    <Input className='product_amount_input' prefix="#"  type='number' placeholder="Amount in Stock" />
                </div>
                <div className='pDetail'>
                    <TextArea className='product_detail_input' placeholder='Product Description'  rows={8} />
                </div>                


            </div>

        </div>

        <div className="buttonHolder">
            <Button
                className='add_product_btn'
                
                icon={<AddCircleOutlineOutlinedIcon />}
              
            >
                Add to Stock
            </Button>
            <Button
                className='add_product_cancel_btn'
                type='primary'
               
              
            >
                Cancel
            </Button>
        </div>

    </div>
  )
}
