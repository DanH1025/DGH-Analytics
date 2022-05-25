import React from 'react'
import './detailAverage.css'


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

export default function DetailAverage({onMorePage}) {

  const dispatch = useDispatch();
  
  const [searchInput , setSearchInput] = useState('');

 	useEffect(() => {
    dispatch(getOrderTotal());
 	  dispatch(getOrderReports());
    dispatch(getOrders());
    dispatch(getUserLogDetail());
 	
  }, [searchInput])
   
  
  const orderReports = useSelector((state) => state.getOrderReport.orderReports);
  console.log(orderReports);

  const days = ['Mon','Tue','Wen','Thu','Fri','Sat','Sun'];
  
  // console.log(orderReports[0].'id');
  // console.log(prices);
  const stat = {
    options: {
      chart: {
        id: "basic-bar",
        title: "Order"
      },
      xaxis: {
        categories: orderReports.map(a => a.date + '')
      }
    },
    series: [
      {
        name: "order",
        data: orderReports.map(a => a.average)
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
      title: 'Date',
      dataIndex: 'date',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'age',
    },
    {
      title: 'Total sales',
      dataIndex: 'total',
      key: 'address',
      render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    {
      title: 'Average',
      key: 'tags',
      dataIndex: 'average',
      render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    
  ];

  return (
    <>
      <div className="tops">
        <Button style={{display: 'inline'}} onClick={() => {
          onMorePage(0);
        }}> Go Back </Button> 
        Average order value over time
      </div>
      <div className="cha">
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
      </div>

      <br />
      <br />
      <br />

      <div>
        <Table columns={colum} dataSource={orderReports} />
      </div>
    </>  
  )
}
