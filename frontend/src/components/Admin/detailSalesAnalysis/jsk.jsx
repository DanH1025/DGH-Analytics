import React from 'react'
import './detailSalesAnalysis.css'


import { Table , Switch , message, Button} from 'antd';
import {ArrowBack} from '@material-ui/icons';

import Chart from "react-apexcharts";
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

import {InputLabel, MenuItem, FormHelperText, FormControl, Select} from '@mui/material';
// import {  } from '@mui/material/Select';


import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { Button } from "@material-ui/core";

// import { Select } from 'antd';
import axios from 'axios';

import { getOrders } from '../../../redux/actions/orderActions';
import { getOrderReports, getOrderTotal } from "../../../redux/actions/orderReportAction";
import { getUserLogDetail } from "../../../redux/actions/userLogActions";
import { render } from 'express/lib/application';



const { Option } = Select;

export default function DetailSalesAnalysis({onMorePage}) {

  const dispatch = useDispatch();
  
  const [age, setAge] = React.useState('');
  const [searchInput , setSearchInput] = useState('');

 	useEffect(() => {
    dispatch(getOrderTotal());
 	  dispatch(getOrderReports());
    dispatch(getOrders());
    dispatch(getUserLogDetail());
 	
  }, [searchInput])
   
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const orderReports = useSelector((state) => state.getOrderReport.orderReports);
  // console.log(orderReports);

  const days = ['Mon','Tue','Wen','Thu','Fri','Sat','Sun'];
  
  const stat = {
    options: {
      chart: {
        id: "basic-bar",
        title: "Order"
      },
      xaxis: {
        categories: orderReports.map(a => a.date + '').reverse()
      }
    },
    series: [
      {
        name: "order",
        data: orderReports.map(a => a.total).reverse()
      }
    ],
    theme: {
      mode: 'dark', 
      palette: 'palette1', 
      monochrome: {
          enabled: false,
          color: '#255aee',
          shadeTo: 'light',
          shadeIntensity: 0.65
      },
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
      // valueGetter: (orderReports) => `${orderReports.total} - ${orderReports.cost}`,
      // dataIndex: 'average',
      render: (text) => <sp  an>ETB {text.toFixed(2)} </sp>,
    },
    
  ];

  const ProfitGetter = (data) => {
    return 'ETB ' + (Number(data.row.total) - Number(data.row.cost)).toFixed(2);
  };
  const addETBGetter = (data) => {
    // console.log(data);
    return 'ETB ' + (Number(data)).toFixed(2)
  }

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
          <h3>Average Sales value</h3>
          <Chart
            className="order_barChart"
            title='Orders'
            options={stat.options}
            series={stat.series}
            type="area"
            theme='dark'
            height="200%"
            width="100%"
             />
      </div>

      <br /><br /><br />

      {/* <div>
        <Table columns={colum} dataSource={orderReports} />
      </div> */}

      <div className='table' style={{ height: '100%', width: '100%' }}>
        <div className='dataPicker'>
          <h3 className='tableName'>Table</h3>
          <div className='picker'>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={age}
                onChange={handleChange}
                // displayEmpty
                // inputProps={{ 'aria-label': 'Without label' }}
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                <MenuItem value={20}>Days</MenuItem>
                <MenuItem value={10}>Month</MenuItem>
                <MenuItem value={30}>Year</MenuItem>
              </Select>
              {/* <FormHelperText>Without label</FormHelperText> */}
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={age}
                onChange={handleChange}
                // displayEmpty
                // inputProps={{ 'aria-label': 'Without label' }}
              >
              
                {/* {
                  // months.map((item) => {
                    <MenuItem value='1'>{item}</MenuItem>
                  })
                } */}
                
                <MenuItem value={10}>Month</MenuItem>
                {/* <MenuItem value={30}>Year</MenuItem> */}
              </Select>
            </FormControl>
          </div>
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
