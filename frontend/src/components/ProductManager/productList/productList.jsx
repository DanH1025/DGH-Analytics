import React from 'react'
import './productList.css'


import { Table , Switch , Button} from 'antd';

import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts ,deleteProductById } from '../../../redux/actions/productActions';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';



import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

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
        console.log("this is the record" + record);
        console.log("this is selected" + selected);
        console.log("this is selectedRow" + selectedRows)
        console.log( selectedRows[0].id);
        
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
        },
        hideSelectAll: true,
  };

    //delete product handler
    const deleteProduct = () =>{
      alert("delting");
    }

 
  const [fixedTop, setFixedTop] = React.useState(false);


  
   const data = [];
 

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
        

      ];
    
    

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
                count_in_stock: val.countInStock,
                status:  val.countInStock === 0 ? <FiberManualRecordIcon style={{color:"#ff0000"}} /> : <FiberManualRecordIcon style={{color:"#19ff05"}} /> 
            })
          })
      };




      

  return (
    <>
    <div className='deleteEditButtonHolder'>
      <Button type="primary" danger onClick={()=> deleteProduct}  >
        Delete
      </Button>
    </div>

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

</>


       
  )
}
