import React from 'react'
import './productList.css'


import { Table, Switch } from 'antd';

import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/actions/productActions';

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';



// rowSelection objects indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };




export default function ProductList() {


    
    
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProducts());
    }, [dispatch]);
  
  
   const products = useSelector((state) => state.getProduct.products);
  
   console.log(products);
  
   const data = [];
 

    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
       
         
        },
        {
          title: 'Brand',
          dataIndex: 'brand',
          key: 'brand',
    
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
           
        },
        {
            title: 'Count In Stock',
            dataIndex: 'count_in_stock',
            key: 'count_in_stock',

        },
        {
            dataIndex: 'status',
            key: "status",
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
                name: val.productName,
                brand: val.productBrand,
                price: val.productPrice,
                count_in_stock: val.countInStock,
                status:  val.countInStock === 0 ? <FiberManualRecordIcon style={{color:"#ff0000"}} /> : <FiberManualRecordIcon style={{color:"#19ff05"}} /> 
            })
          })
      }







  return (
        <Table
        columns={columns}
        rowSelection={{ ...rowSelection }}
        dataSource={data}
    /> 
  )
}
