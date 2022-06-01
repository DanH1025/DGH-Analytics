import React from 'react'
import './detailSalesAnalysis.css'

import {ArrowBack} from '@material-ui/icons';
import { Table , Switch , message, Button} from 'antd';

import Chart from "react-apexcharts";
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

import {DataGrid} from "@mui/x-data-grid";

// import { Button } from "@material-ui/core";

// import { Select } from 'antd';
import axios from 'axios';

import { getOrders } from '../../../redux/actions/orderActions';
import { getOrderReports, getOrderTotal } from "../../../redux/actions/orderReportAction";
import { getUserLogDetail } from "../../../redux/actions/userLogActions";

import {InputLabel, MenuItem, FormHelperText, FormControl, Select} from '@mui/material';

// const { Option } = Select;

export default function DetailSalesAnalysis({onMorePage}) {

  const dispatch = useDispatch();
  const [age, setAge] = useState('');
  
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
        data: orderReports.map(a => a.total)
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
      title: 'Cost',
      dataIndex: 'cost',
      key: 'address',
      render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    {
      title: 'Profit',
      key: 'tags',
      dataIndex: 'average',
      render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    
  ];

  const ProfitGetter = (data) => {
    return 'ETB ' + (Number(data.row.total) - Number(data.row.cost)).toFixed(2);
  };
  const addETBGetter = (data) => {
    // console.log(data);
    return 'ETB ' + (Number(data)).toFixed(2)
  }

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const columns = [
    { field: 'date', headerName: 'Date', width: 170 },
    { field: 'orders', headerName: 'Orders', width: 130 },
    { 
      field: 'total', 
      headerName: 'Total sales', 
      width: 180,
      valueGetter: (data) => addETBGetter(data.row.total)
    },
    {
      field: 'cost',
      headerName: 'Cost',
      // type: 'number',
      // align: 'left',
      width: 130,
      valueGetter: (data) => addETBGetter(data.row.cost)
    },
    {
      field: 'profit',
      headerName: 'Profit',
      description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      // width: 150,
      valueGetter: (data) => ProfitGetter(data)
    },
  ];
  const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <>
      <div className="tops">
        <Button onClick={() => {
          onMorePage(0);
        }}> <ArrowBack fontSize='large'/> </Button>
        <h3>Average sales value over time</h3>
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

      <br /><br /><br />

      <div className='table' style={{ height: '100%', width: '100%' }}>
        {/* <Table columns={colum} dataSource={orderReports} /> */}
        <div>
          <Select
            value={age}
            onChange={handleChange}
            // displayEmpty
            // inputProps={{ 'aria-label': 'Without label' }
          >
            <MenuItem value={20}>Days</MenuItem>
            <MenuItem value={10}>Month</MenuItem>
            <MenuItem value={30}>Year</MenuItem>
          </Select>
          <Select
            // value={age}
            // onChange={handleChange}
            // displayEmpty
            // inputProps={{ 'aria-label': 'Without label' }
          >
            {months.map((item) => {
              console.log(item);
              <MenuItem value={item}>{item}</MenuItem>
            })}
          </Select>
        </div>
        <DataGrid
          rows={orderReports}
          columns={columns}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          // checkboxSelection
        />  
      </div>
    </>  
  )
}
