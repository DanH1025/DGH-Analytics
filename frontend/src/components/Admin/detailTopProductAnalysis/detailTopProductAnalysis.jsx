import React from 'react'
import './detailTopProductAnalysis.css'


import { Table , Switch , message, Button} from 'antd';

import Chart from "react-apexcharts";
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

// import { Button } from "@material-ui/core";

import { Select } from 'antd';
import axios from 'axios';

import { getOrders } from '../../../redux/actions/orderActions';
import { getOrderReports, getOrderTotal } from "../../../redux/actions/orderReportAction";
import { getUserLogDetail } from "../../../redux/actions/userLogActions";

const { Option } = Select;

export default function DetailTopProductAnalysis({onMorePage}) {

  const dispatch = useDispatch();
  
  const [searchInput , setSearchInput] = useState('');

 	useEffect(() => {
    dispatch(getOrderTotal());
 	
  }, [searchInput])
   
  
  const orderTotal = useSelector((state) => state.getOrderTotal.total);
  // const product = JSON.stringify(orderTotal[0]);
  console.log(orderTotal);

  let topProdByQun = [];
  let topProdByPrice = [];
  {
    orderTotal?.map((repo) => {
      topProdByQun = repo.topProdByQun;
      topProdByPrice = repo.topProdByPrice;
    })
  } 

  const days = ['Mon','Tue','Wen','Thu','Fri','Sat','Sun'];
  
  const stat = {
    options: {
      chart: {
        id: "basic-bar",
        title: "Order"
      },
      xaxis: {
        categories: orderTotal.map(a => a.productName + '')
      }
    },
    series: [
      {
        name: "order",
        data: orderTotal.map(a => a.productName)
      }
    ],
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: "#535A6C",
      xaxis: {
        lines: {
          show: true
        }
      }
    }
  }

  const colum = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Product category',
      dataIndex: 'productCategory',
      key: 'age',
    },
    {
      title: 'Quantity sold',
      dataIndex: 'quantity',
      key: 'address',
      // render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    {
      title: 'Gross sales',
      dataIndex: 'totalSale',
      key: 'address',
      // render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    {
      title: 'Profit',
      key: 'tags',
      dataIndex: 'profit',
      // render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    
  ];

  return (
    <>
      <div className="tops">
        <Button style={{display: 'inline'}} onClick={() => {
          onMorePage(0);
        }}> Go Back </Button> 
        Sales by product
      </div>

      {/* <div className="cha">
          <h3>Average order value</h3>
          <Chart
            className="order_barChart"
            title='Orders'
            options={stat.options}
            series={stat.series}
            type="area"
            height="200%"
            width="100%"
             />
      </div> */}

      <br /><br /><br />

      <div>
        <Table columns={colum} dataSource={topProdByQun} />
      </div>
    </>  
  )
}
