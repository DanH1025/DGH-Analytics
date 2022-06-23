import React from 'react'
import './detailSessionAnalysis.css'
  
import {ArrowBack} from '@material-ui/icons';

import { Table , Switch , message, Button} from 'antd';

import {DataGrid} from "@mui/x-data-grid";
import Chart from "react-apexcharts";
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';

// import { Button } from "@material-ui/core";

import axios from 'axios';

import { getOrders } from '../../../redux/actions/orderActions';
import { getOrderReports, getOrderTotal, getOrderReportByMonth, getOrderReportByYear, getOrderReportByWeek, getOrderReportOfLastWeek } from "../../../redux/actions/orderReportAction";
import { getUserLogDetail } from "../../../redux/actions/userLogActions";

import {InputLabel, MenuItem,Option, FormHelperText, FormControl, Select} from '@mui/material';


export default function DetailSessionAnalysis({onMorePage}) {
  
  const  months = [
    {id: 1, name: "January"}, 
    {id: 2, name: "February"}, 
    {id: 3, name: "March"}, 
    {id: 4, name: "April"}, 
    {id: 5, name: "May"}, 
    {id: 6, name: "June"}, 
    {id: 7, name: "July"}, 
    {id: 8, name: "August"}, 
    {id: 9, name: "September"}, 
    {id: 10, name: "October"}, 
    {id: 11, name: "November"}, 
    {id: 12, name: "December"}
  ];
  const days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29, 30];
  const years = [2022,2021,2020,2019,2018];
  const dispatch = useDispatch();
  
  const currentday = new Date().getMonth() + 1;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [selectedOption, setSelectedOption] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [searchInput , setSearchInput] = useState('');
  const [dateOption, setDateOption] = useState('week');


 	useEffect(() => {
    dispatch(getOrderTotal());
 	  dispatch(getOrderReports());
    dispatch(getOrders());
    dispatch(getUserLogDetail());
    dispatch(getOrderReportOfLastWeek())
  }, [searchInput])
   
  const handleChange = (event) => {
    setDateOption(event.target.value);
    console.log(dateOption);
    if(event.target.value === 'month'){
      console.log('inside mnth');
      dispatch(getOrderReportByMonth(selectedOption ))
    }else if(event.target.value === 'year'){
      console.log('inside year');
      dispatch(getOrderReportByYear(event.target.value))
    }else if(event.target.value === 'week'){
      console.log('inside year');
      dispatch(getOrderReportOfLastWeek())
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
    // console.log(selectedOption + ':' + dateOption);
    if(dateOption === 'month'){
      console.log('inside mnth');
      dispatch(getOrderReportByMonth(event.target.value))
    }else if(dateOption === 'year'){
      console.log('inside year');
      dispatch(getOrderReportByYear(event.target.value))
    }
  };
  
  const orderReports = useSelector((state) => state.orderReportsSpecific.orderReportSpecific);
  console.log(orderReports);

  const [displayOrders, setDisplayedOrders] = useState(orderReports);
  
  useEffect(() => {
    setDisplayedOrders(orderReports);
  }, [handleSelectChange])

  const stat = {
    options: {
      chart: {
        id: "basic-bar",
        title: "Order"
      },
      xaxis: {
        categories: dateOption === 'year' ? 
        (orderReports?.map(a => a.date + '').reverse()) : 
        dateOption === 'week' ? (orderReports?.map(a => a.date.slice(5) + '').reverse()) : 
        orderReports?.map(a => a.date.slice(5) + '')
      } 
    },
    series: [
      {
        name: "order",
        data: dateOption === 'year' ? 
        (orderReports?.map(a => a.session).reverse()) : 
        dateOption === 'week' ? (orderReports?.map(a => a.session).reverse()) : orderReports?.map(a => a.session)
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
      title: 'Session',
      dataIndex: 'session',
      key: 'session',
      sorter: (a, b) => a.session - b.session
    },
    {
      title: 'Added to cart',
      dataIndex: 'addToCart',
      key: 'addToCart',
      sorter: (a, b) => a.addToCart - b.addToCart
      // render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    {
      title: 'Reached checkout',
      dataIndex: 'reachedCheckout',
      key: 'reachedCheckout',
      sorter: (a, b) => a.reachedCheckout - b.reachedCheckout
      // render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    {
      title: 'Session converted',
      dataIndex: 'converted',
      key: 'converted',
      sorter: (a, b) => a.converted - b.converted
      // render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
  ];

  const ConversionGetter = (data) => {
    return  (Number(data.row.session) / Number(data.row.converted)).toFixed(2) + 'ETB ';
  };

  const columns = [
    { field: 'date', headerName: 'Date', width: 170 },
    { field: 'session', headerName: 'Session', width: 130 },
    { 
      field: 'addToCart', 
      headerName: 'Added to cart', 
      width: 180
    },
    {
      field: 'reachedCheckout',
      headerName: 'Reached checkout',
      width: 130,
      sorter: (a, b) => a.addToCart - b.addToCart
    },
    {
      field: 'converted',
      headerName: 'Session converted',
      width: 130,
      sorter: (a, b) => a.converted - b.converted
    },
    {
      field: 'conversionRate',
      headerName: 'Conversion Rate',
      description: 'This column has a value getter and is not sortable.',
      // sortable: false,
      // width: 150,
      valueGetter: (data) => ConversionGetter(data)
    },
  ];



  return (
    <>
      <div className="tops">
        <Button onClick={() => {
          onMorePage(0);
        }}> <ArrowBack fontSize='large'/> </Button>
        <h3>Session </h3>
      </div>
      <div className="cha">
        <h3>Number of visits</h3>
        <Chart
          className="order_barChart"
          title='Orders'
          options={stat.options}
          series={stat.series}
          type="bar"
          height="200%"
          width="100%"
            />
      </div>

      <div className='table'>

      <div>
        <Select
          value={dateOption ?? " "}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue={dateOption}>
            <MenuItem value="week">This week</MenuItem>
            <MenuItem value="month">Monthly</MenuItem>
            <MenuItem value="year">Yearly</MenuItem>
        </Select>
          {     
            dateOption === 'days' ? days.map((item) => { 
              return(
                // <MenuItem value={item}>{item}</MenuItem>
                ""
              )
            }) : dateOption === 'month' ?
            <Select
            value={selectedOption ?? " "}
            onChange={handleSelectChange}
            // inputProps={{ 'aria-label': 'Without label' }
            displayEmpty>
              {months.map((item) => {
                return(
                  <MenuItem value={item.id}>{item.name}</MenuItem>
              )})}
            </ Select>
            : dateOption === 'year' ?
            <Select
            value={selectedYear ?? " "}
            onChange={handleSelectChange}
            // inputProps={{ 'aria-label': 'Without label' }
            displayEmpty>
              {years.map((item) => {
                return(
                  <MenuItem value={item}>{item}</MenuItem>
              )}) }
            </Select> 
            : ""
          }
          
        </div>

        <Table 
          columns={colum} 
          dataSource={displayOrders} />
        <div >
          
        </div>
      </div>
    </>  
  )
}
