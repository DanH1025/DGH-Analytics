import React from 'react'
import './detailSessionAnalysis.css'


import { Table , Switch , message, Button} from 'antd';

import Chart from "react-apexcharts";
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

// import { Button } from "@material-ui/core";

import axios from 'axios';

import { getOrders } from '../../../redux/actions/orderActions';
import { getOrderReports, getOrderTotal, getOrderReportByMonth, getOrderReportByYear } from "../../../redux/actions/orderReportAction";
import { getUserLogDetail } from "../../../redux/actions/userLogActions";

import {InputLabel, MenuItem,Option, FormHelperText, FormControl, Select} from '@mui/material';


export default function DetailSessionAnalysis({onMorePage}) {

  const dispatch = useDispatch();
  
  const currentday = new Date().getMonth() + 1;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [selectedOption, setSelectedOption] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [searchInput , setSearchInput] = useState('');
  const [dateOption, setDateOption] = useState('month');


 	useEffect(() => {
    dispatch(getOrderTotal());
 	  dispatch(getOrderReports());
    dispatch(getOrders());
    dispatch(getUserLogDetail());
    dispatch(getOrderReportByMonth(currentMonth))
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
    }
  };

  const handleSelectChange = (event) => {
    // setSelectedOption(event.target.value);
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
        categories: orderReports.map(a => a.date + '').reverse()
      }
    },
    series: [
      {
        name: "order",
        data: orderReports.map(a => a.session).reverse()
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
      key: 'age',
    },
    {
      title: 'Added to cart',
      dataIndex: 'addToCart',
      key: 'address',
      // render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    {
      title: 'Reached checkout',
      dataIndex: 'reachedCheckout',
      key: 'address',
      // render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    {
      title: 'Session converted',
      dataIndex: 'converted',
      key: 'address',
      // render: (text) => <span>ETB {text.toFixed(2)} </span>,
    },
    {
      title: 'Conversion Rate',
      key: 'tags',
      dataIndex: 'average',
  
      render: (text) => <span>{text != null ? text.toFixed(2) : text} %</span>,
    },
    
  ];

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


  return (
    <>
      <div className="tops">
        <Button style={{display: 'inline'}} onClick={() => {
          onMorePage(0);
        }}> Go Back </Button> 
        Average sales value over time
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

      <div>

      <div>
        <Select
          value={dateOption ?? " "}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue={dateOption}>
            <MenuItem value="days">Daily</MenuItem>
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
            : <MenuItem value="0">"no item"</MenuItem>
          }
          
        </div>

        <Table columns={colum} dataSource={displayOrders} />
      </div>
    </>  
  )
}
