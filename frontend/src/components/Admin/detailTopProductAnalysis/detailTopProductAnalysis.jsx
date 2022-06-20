import React from 'react'
import './detailTopProductAnalysis.css'


import { Table , Switch , message, Button} from 'antd';

import {ArrowBack} from '@material-ui/icons';
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
      title: 'Product visit',
      dataIndex: 'visits',
      key: 'visits',
      sorter: (a, b) => a.visits - b.visits
      // render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    {
      title: 'Quantity sold',
      dataIndex: 'sold',
      key: 'sold',
      sorter: (a, b) => a.sold - b.sold
      // render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    {
      title: 'Conversion rate',
      dataIndex: 'conversion',
      key: 'conversion',
      render: (text) => <span> {text} % </span>,
      sorter: (a, b) => a.conversion - b.conversion
    },
    {
      title: 'Gross sales',
      dataIndex: 'totalSale',
      key: 'totalSale',
      sorter: (a, b) => a.totalSale - b.totalSale,
      render: (text) => <span>ETB {text} </span>,
    },
    {
      title: 'Profit',
      key: 'tags',
      dataIndex: 'profit',
      render: (text) => <span>ETB {text}  </span>,
    },
    
  ];

  return (
    <>
      <div className="tops">
        <Button onClick={() => {
          onMorePage(0);
        }}> <ArrowBack fontSize='large'/> </Button>
        <h3>Sales by product</h3>
      </div>

      <div>
        <Table columns={colum} dataSource={topProdByQun} />
      </div>
    </>  
  )
}
