import React from 'react'
import './productList.css'


import { Table , Switch , message,Button} from 'antd';

import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';



import { Drawer, Form, Col, Row, Input, Select, DatePicker, Space } from 'antd';



const { Option } = Select;




export default function ProductList() {


    const dispatch = useDispatch();

        useEffect(() => {
          dispatch(getProducts());
        }, [dispatch]);
      
      
   const products = useSelector((state) => state.getProduct.products);
  
   console.log(products);

 

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

    if(window.confirm("Are you sure you want to delete?")){
        dispatch(deleteProductById(record.id));
        setVisible(false);
        message.success("Deleted Successfully");
        dispatch(getProducts());
       
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
    count_in_stock: '',
  })
  const EditProduct = (record) =>{
   
    setEditValues({ ...editValues,
      id: record.id,
      category: record.category,
      image: record.image,
      detail: record.detail,
      name: record.name,
      brand: record.brand,
      price: record.price,
      count_in_stock: record.count_in_stock
    })

  }
  const handleEditChanges = () =>{
    console.log("handling edit changes");
      dispatch(editProduct(editValues))
      setVisible(false);
      message.success("Product Updated");
      dispatch(getProducts());
  }      


 

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          fixed: 'left',
          width: 50
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width:150,
          fixed:'left'
       
         
        },
        {
          title: 'Brand',
          dataIndex: 'brand',
          key: 'brand',
          width:150

    
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width:70
           
        },
        {
            title: 'Count In Stock',
            dataIndex: 'count_in_stock',
            key: 'count_in_stock',
            width:100

        },
        {
          title: 'Category',
          dataIndex:'category',
          key: 'category',
          width:100
        },
        {
          title: 'Details',
          dataIndex:'detail',
          key:'detail',
          width:250
        },
        {
            title:'Status',
            dataIndex: 'status',
            key: "status",
            width:60,
            fixed: 'right'
        },
        {
          title: "Action",
          key: "deleteAndEdit",
          width: 70,
          fixed: 'right',
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
 
  
console.log(data)

      if(!products.length){
          return <div></div>
      }
      else{
          products.map((val,key)=>{
            data.push({
                key: val.id,
                id: val.id,
                category:val.productCategory,
                detail: val.productDetail,
                image: val.productImg,
                name: val.productName,
                brand: val.productBrand,
                price: val.productPrice,
                count_in_stock: val.countInStock === 0 ? <h4 style={{color:"#ff0000" , fontWeight:"bolder"}} >{val.countInStock}</h4> : <h4 style={{color:"#19ff05", fontWeight:"bolder"}} >{val.countInStock}</h4>  ,
                status:  val.countInStock === 0 ? <FiberManualRecordIcon style={{color:"#ff0000"}} /> : <FiberManualRecordIcon style={{color:"#19ff05"}} /> 
            })
          })
          
      };


     


  return (
    <>

    <Table
    rowSelection={{ ...rowSelection }}
    columns={columns}
    dataSource={data}
    scroll={{ x: 1300 }}
    summary={pageData => (
      <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
        <Table.Summary.Row>
       
          <Table.Summary.Cell index={2} colSpan={8}>
            Scroll Context
          </Table.Summary.Cell>
          <Table.Summary.Cell index={10}></Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    )}
    sticky
  />




<Drawer
      title="Edit Product"
      width={720}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
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
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Product Name"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input value={editValues.name} onChange={(e)=> setEditValues({...editValues, name: e.target.value})}  placeholder={editValues.name} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="image"
              label="Product Image"
              rules={[{ required: true, message: 'Please enter image url' }]}
            >
              <Input
                style={{ width: '100%' }}
                addonBefore="http://"                
                placeholder={editValues.image}
                value={editValues.image} onChange={(e)=> setEditValues({...editValues, image: e.target.value})}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
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
          </Col>
          <Col span={12}>
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
              <Form.Item
              name="count_in_stock"
              label="Amount In Stock"
              rules={[{ required: true, message: 'Please enter count in stock' }]}
            >
              <Input prefix='#' min={0} type='number' placeholder={editValues.count_in_stock}  value={editValues.count_in_stock} onChange={(e)=> setEditValues({...editValues, count_in_stock: e.target.value})}   />
            </Form.Item>
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
