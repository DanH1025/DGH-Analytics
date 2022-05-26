import React from 'react'
import './productList.css'



import { Table , message,Button} from 'antd';

import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';


import { Drawer, Form, Col, Row, Input, DatePicker, Space } from 'antd';
import axios from 'axios';




import {Link} from 'react-router-dom'
import {Search } from '@material-ui/icons'


import TvIcon from '@material-ui/icons/Tv';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import WatchIcon from '@material-ui/icons/Watch';
import ComputerIcon from '@material-ui/icons/Computer';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';




import { getProductsByCategory } from '../../../redux/actions/productActions';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';






const { Option } = Select;





const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));










export default function ProductList() {

  const classes = useStyles();
  const [age, setAge] = React.useState('');
  

    const dispatch = useDispatch();

    const [products ,setProducts] = useState([]);
    const [searchInput , setSearchInput] = useState('');

    const [searchCategory , setSearchCategory]= useState(''); // search category selection

    const [open_category ,  setOpen_category] = React.useState(false);

      // to handle the changes on the search catagory option
    //   const handleSearchCategoryChange = (event)=>{
    //     setSearchCategory(event.target.value);
    // }

    //to handle when the search category option closes
    const handleCloseSearchCategory = () =>{
        setOpen_category(false);
    }
    // //to handle hwen the search category option opens
    const handleOpenSearchCategory = () =>{
        setOpen_category(true);
    }


      //set style for all and active product list
      const [isAll ,setIsAll] = useState(0);

      const handleAllSelection = async()=>{
        if(isAll === 1 || isAll === 2){
          setIsAll(0);
          const res =  await axios.get(`http://localhost:5000/api/getAllProducts?sq=${searchInput}`);
          setProducts(res.data);
        }else{
        }
      }

      const handleActiveSelection = async()=>{
        
        if(isAll === 0 || isAll === 2){        
          setIsAll(1);         
          const res =  await axios.get(`http://localhost:5000/api/getActiveProducts?sq=${searchInput}`);
          setProducts(res.data); 
          
        }else{
          
        }
      }
      const handleDiActiveSelection = async ()=>{
        if(isAll === 0 || isAll === 1){
          setIsAll(2);          
          const res = await axios.get(`http://localhost:5000/api/getDiActiveProducts?sq=${searchInput}`)
          setProducts(res.data)
        }else{

        }
      }

   


    

    useEffect(()=>{
      const fetchProducts = async ()=>{
        const res = await axios.get(`http://localhost:5000/api/getAllProducts?sq=${searchInput}`);
        setProducts(res.data);
      }

      fetchProducts()
    }, [searchInput])

    

  


    // rowSelection objects indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    
        },
        onSelect: (record, selected, selectedRows ) => {
        console.log(record, selected, selectedRows);
      
        console.log( selectedRows[0].id);
        
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
        },
        getCheckboxProps: (record)=>{
          //console.log(record)  
        }  ,
        selections: true,
        hideSelectAll: true,
  };




      
   
 
  const [fixedTop, setFixedTop] = React.useState(false);

 

   //handle delete
   const DeleteProduct = (record) =>{
    console.log(record.id)    

    if(record.statusValue === 0){
      message.error("Product Already Deleted")
    }
    else{
      if(window.confirm("Are you sure you want to delete?")){
        dispatch(deleteProductById(record.id));
        setVisible(false);
        message.success("Deleted Successfully");
        // dispatch(getAllProducts());
       
    }
      
    }
  

  }

  //state for sidedrawer edit

  const [visible , setVisible] = useState(false)
  //state = { visible: false };

  const showDrawer = () => {
    setVisible(!visible);
  };

  const onClose = () => {
    setVisible(false);
  }

  const [editValues ,setEditValues] = useState({
    id:'',
    category:'',
    detail: '',
    image: '',
    name: '',
    brand: '',
    price: '',
    status:'',
    count_in_stock: '',
  })
  // state for product list search bar

 

  const EditProduct = (record) =>{
   
    setEditValues({ ...editValues,
      id: record.id,
      category: record.category,
      image: record.image,
      detail: record.detail,
      name: record.name,
      brand: record.brand,
      price: record.price,
      count_in_stock: record.count_in_stock,
      status: record.statusValue 
    })

  }
  const handleEditChanges = () =>{
    console.log("handling edit changes");
      dispatch(editProduct(editValues))
      setVisible(false);

      if(editValues.status === 0){
         message.warning("Product is still inactive");
      }
      
      message.success("Product Updated");
      dispatch(getAllProducts());
  }      


  const [sortedInfo ,setSortedInfo] = useState()
 
  const handleChange = (pagination, filters, sorter) =>{
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter)
  }


    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          fixed: 'left',
          width: 30
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width:110,       
       
         
        },
  
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width:70,
            ellipsis: true,
            sorter: (a, b) => a.price - b.price
            
           
        },
        {
            title: 'Count In Stock',
            dataIndex: 'count_in_stock',
            key: 'count_in_stock',
            width:80,
            sorter: (a, b) => a.count_in_stock - b.count_in_stock

        },
        {
          title: 'Category',
          dataIndex:'category',
          key: 'category',
          width:100
        },   
        {
            title:'Status',
            dataIndex: 'status',
            key: "status",
            width:60,
            
        },
        {
          title: "Action",
          key: "deleteAndEdit",
          width: 70,
          
          render: (record) => {
            return(
              <>
              <EditOutlinedIcon  onClick={()=> { 
                showDrawer()  
                EditProduct(record)} 
              }
                style={{color: "gray" , fontWeight: "bolder", cursor: "pointer" }}  />
              <DeleteOutlineOutlinedIcon onClick={() =>{
                DeleteProduct(record)
              }}  style={{color: "red" , fontWeight: "bolder", cursor: "pointer" , marginLeft:10}}  />

              </>
            );
          },
        },
        

      ];

      const categoryChangeHandler = (event) => {
        setSearchCategory(event.target.value);
        console.log(searchCategory)
        console.log("inside category handler");

        const response =  axios.post('http://localhost:5000/api/getProductsByCategory', {category: event.target.value });
        setProducts(response.data);  
       
        
          
      
      };


      
      


    
    const data = [];



  //  const keys =["productName", "productBrand", "productCategory","productPrice"];
      

   
      if(!products?.length){
          
      }
      else{          
          products.filter(
            (product)=>product.productName.toLowerCase().includes(searchInput)                              
            
          ).map((val,key)=>{
            data.push({
                key: val.id,
                id: val.id,
                category:val.productCategory,
                detail: val.productDetail,
                image: val.productImg,
                name: val.productName,
                brand: val.productBrand,
                price: val.productPrice,
                statusValue: val.status,
                count_in_stock: val.countInStock,
                status:  val.status === 0 ? <FiberManualRecordIcon style={{color:"#ff0000"}} /> : <FiberManualRecordIcon style={{color:"#19ff05"}} /> 
            })
          })

        

          
      };
     


    


      console.log(searchInput);
  return (
    <>
   <div className="productListPageHolder">
    <div className="searchBarContainer">
        <div className="sorter">
            <div className="active_only">
              <div className="active_only_wrapper">
               <div className="all_products"   onClick={handleAllSelection}   style={isAll === 0? {backgroundColor: '#ffc400cc', border:'none', color:'white'}: {}} >
                  <p>All</p>
               </div>
               <div className="active_products" onClick={handleActiveSelection}  style={isAll === 1? {backgroundColor: '#ffc400cc', color:'white', border:'none'}: {}}  >
                  <p>Active</p>
               </div>
               <div className="diactive_products" onClick={handleDiActiveSelection}  style={isAll === 2 ? {backgroundColor: '#ffc400cc', color:'white', border:'none'}: {}}  >
                  <p>Diactive</p>
               </div>            
              </div>
                
            </div>
            
        </div>
       <div className="productList_searchBarWrapper">


          <div className="productList_search">
                    <div className="productList_searchWrapper">                 
                      <div className="productLIst_category">
                        <FormControl variant="outlined" className='productList_searchCategoryForm'>                    
                          <Select className='productList_searchCategorySelect'
                              labelId='productList_searchCategory-items-lable'
                              id='productList_searchCategory-items'
                              displayEmpty="true"
                              open={open_category}
                              onClose={handleCloseSearchCategory}
                              onOpen={handleOpenSearchCategory}
                              value={searchCategory}
                              onChange={categoryChangeHandler}
                             
                          >
                            <MenuItem  className='allCategoryMenuItem' value="">
                                  Category
                            </MenuItem>
                            <MenuItem className='productList_allCategoryMenuItem' value={"television"}>
                              <TvIcon className='menuItemIcons' /> TV </MenuItem>
                              <MenuItem  className='productList_allCategoryMenuItem' value={"smart phone"}>
                            <PhoneAndroidIcon className='menuItemIcons' /> 	Smart Phone </MenuItem>
                            <MenuItem  className='productList_allCategoryMenuItem' value={"smart watch"}>
                              <WatchIcon className='menuItemIcons' /> Smart Watch </MenuItem>
                            <MenuItem  className='productList_allCategoryMenuItem' value={"PC"}>
                            <ComputerIcon className='menuItemIcons' /> Computer </MenuItem>
                            <MenuItem  className='productList_allCategoryMenuItem' value={"Moniter"}>
                            <DesktopMacIcon className='menuItemIcons' /> Moniter</MenuItem>
                            <MenuItem  className='productList_allCategoryMenuItem' value={"play station"}>
                            <SportsEsportsIcon className='menuItemIcons'/>PS</MenuItem>
                          </Select> 
                        
                        </FormControl>
                      </div>
                      <div className="productList_searchInput">
                        <input  
                        placeholder='Search product' 
                        name='productList_search'
                        onChange={e=>setSearchInput(e.target.value)}
                        type="text" />
                      </div>
                      {/* <div className="searchbtn">
                          <Link to='/search' className='searchbtnLink'>
                              <Search 
                              onClick={handleSearch}/>
                        </Link> 
                      </div> */}
                    </div>
                  </div>














            {/* <input type="text" 
                   className='productList_searchBar' 
                   placeholder='Search Product'
                   onChange={e=>setSearchInput(e.target.value)}
                   />
             */}
       </div>
    </div>

    <Table 
    rowSelection={{ ...rowSelection }}
    columns={columns}
    dataSource={data}
    scroll={{ x: 1000 }}
    onChange={handleChange}
    summary={pageData => (
          <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
            <Table.Summary.Row >
          
              <Table.Summary.Cell   index={2} colSpan={8}>
                
              </Table.Summary.Cell>
              <Table.Summary.Cell index={10}></Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
    )}
    sticky
    />

</div>


<Drawer
  title="Edit Product"
  width={720}
  onClose={onClose}
  visible={visible}
  bodyStyle={{ paddingBottom: 80 , zIndex: '100'}}
  extra={
    <Space>
      <Button onClick={onClose}>Cancel</Button>
      <Button type="primary" onClick={()=> handleEditChanges()}  >
        Submit
      </Button>
      

    </Space>
  }
>
  <Form layout="vertical" hideRequiredMark>
  <Row gutter={20}>
    </Row>
    <Row gutter={16}>

      <Col span={12}>
         <div className='editProduct_imageHolder'>
            <img src={editValues.image} onClick={()=> message.warning("Want To Change the image")} />
         </div>
      </Col>

      <Col span={12}>
        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[{ required: true, message: 'Please enter product Name' }]}
        >
          <Input value={editValues.name} onChange={(e)=> setEditValues({...editValues, name: e.target.value})}  placeholder={editValues.name} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder={editValues.category} value={editValues.category} onChange={(e)=> setEditValues({...editValues, category: e.target.value})}  >
            <Option value="xiao">Television</Option>
            <Option value="mao">Smart-Phone</Option>
          </Select>
        </Form.Item>


        {/* <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: 'Please choose the brand' }]}
        >
          <Select placeholder={editValues.brand}   value={editValues.brand} onChange={(e)=> setEditValues({...editValues, brand: e.target.value})}     >
            <Option value="private">Samsung</Option>
            <Option value="public">Apple</Option>
          </Select>
        </Form.Item> */}


        <Form.Item
          name="count_in_stock"
          label="Amount In Stock"
          rules={[{ required: true, message: 'Please enter count in stock' }]}
        >
          <Input prefix='#' min={0} type='number' placeholder={editValues.count_in_stock}   value={editValues.count_in_stock} onChange={(e)=> setEditValues({...editValues, count_in_stock: e.target.value})}   />
        </Form.Item>
        

      </Col>

    </Row>
    <Row gutter={16}>
      <Col span={12}>
       
      </Col>
      <Col span={12}>
      
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={12}>
      <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please enter product price' }]}
        >
          <Input min={0} prefix="$" type='number' placeholder={editValues.price} value={editValues.price} onChange={(e)=> setEditValues({...editValues, price: e.target.value})}   />
        </Form.Item>
      </Col>
      <Col span={12}>
        {/* <Form.Item
          name="dateTime"
          label="DateTime"
          rules={[{ required: true, message: 'Please choose the dateTime' }]}
        >
          <DatePicker.RangePicker
            style={{ width: '100%' }}
            getPopupContainer={trigger => trigger.parentElement}
          />
        </Form.Item> */}
       
      </Col>
    </Row>
    <Row gutter={16}>
      <Col span={24}>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'please enter description',
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder={editValues.detail}  value={editValues.detail} onChange={(e)=> setEditValues({...editValues, detail: e.target.value})}   />
        </Form.Item>
      </Col>
    </Row>
  </Form>
</Drawer>

    </>





   

       
  )
}























