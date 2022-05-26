import React from 'react'
import './productList.css'


import { Table , Switch , message,Button} from 'antd';

import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';


import { Drawer, Form, Col, Row, Input, Select, DatePicker, Space } from 'antd';
import axios from 'axios';



const { Option } = Select;















export default function ProductList() {


    const dispatch = useDispatch();

    const [products ,setProducts] = useState([]);
    const [searchInput , setSearchInput] = useState('');
    const [searchCategory , setSearchCategory] = useState('');

    useEffect(()=>{
      const fetchProducts = async ()=>{
        const res = await axios.get(`http://localhost:5000/api/getAllProducts?sq=${searchInput}`);
        setProducts(res.data);
      }

      fetchProducts()
    }, [searchInput])

  //       useEffect(() => {
  //         dispatch(getAllProducts(searchInput));
  //       }, [dispatch]);
      
      
  //  const products = useSelector((state) => state.getProduct.products);
  
   




  //  console.log(products);

   





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

      const data = [];
      const handleCategoryChange = (event) => {
        console.log(event.target.value);
        const cate = event.target.value;
        setSearchCategory(event.target.value);
        console.log(cate)
        console.log("inside category handler");
        if(event.target.value === ''){
          
        }else{
           const response =  axios.post('http://localhost:5000/api/getProductsByCategory', {category: cate});
           setProducts(response.data);  
        }
      };

    

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
       <div className="productList_searchBarWrapper">
            <input type="text" 
                   className='productList_searchBar' 
                   placeholder='Search Product'
                   onChange={e=>setSearchInput(e.target.value)}
                   />
            {/* <div className="searchIconContainer">
              <SearchOutlinedIcon />
            </div> */}
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


        <Form.Item
          name="brand"
          label="Brand"
          rules={[{ required: true, message: 'Please choose the brand' }]}
        >
          <Select placeholder={editValues.brand}   value={editValues.brand} onChange={(e)=> setEditValues({...editValues, brand: e.target.value})}     >
            <Option value="private">Samsung</Option>
            <Option value="public">Apple</Option>
          </Select>
        </Form.Item>


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























