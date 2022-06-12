import React from 'react'
import './detailAverage.css'


import {ArrowBack} from '@material-ui/icons';
import { Table , Switch , message, Button} from 'antd';

import Chart from "react-apexcharts";
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

// import { Button } from "@material-ui/core";

// import { Select } from 'antd';
import axios from 'axios';

import { getOrders } from '../../../redux/actions/orderActions';
import { getUserLogDetail } from "../../../redux/actions/userLogActions";

import { getOrderReports, getOrderTotal, getOrderReportByMonth, getOrderReportByYear, getOrderReportByWeek, getOrderReportOfLastWeek } from "../../../redux/actions/orderReportAction";

import {InputLabel, MenuItem,Option, FormHelperText, FormControl, Select} from '@mui/material';

export default function DetailAverage({onMorePage}) {

  const dispatch = useDispatch();
  
  const [dateOption, setDateOption] = useState('week');
  const currentday = new Date().getMonth() + 1;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [selectedOption, setSelectedOption] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [searchInput , setSearchInput] = useState('');

  

 	useEffect(() => {
    dispatch(getOrderTotal());
 	  dispatch(getOrderReports());
    dispatch(getOrders());
    dispatch(getUserLogDetail());
  }, [searchInput])
   
  
  const orderReports = useSelector((state) => state.getOrderReport.orderReports);
  console.log(orderReports);

  const [displayOrders, setDisplayedOrders] = useState(orderReports);

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
        categories: displayOrders.map(a => a.date + '')
      }
    },
    series: [
      {
        name: "order",
        data: displayOrders.map(a => a.average)
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

  const handleChange = (event) => {
    setDateOption(event.target.value);
    console.log(dateOption);
    if(event.target.value === 'month'){
      console.log('inside mnth');
      dispatch(getOrderReportByMonth(selectedOption ))
    }else if(event.target.value === 'year'){
      console.log('inside year');
      dispatch(getOrderReportByYear(event.target.value))
    }else if(event.target.value === 'weekly'){
      console.log('inside year');
      dispatch(getOrderReportByWeek())
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

  useEffect(() => {
    setDisplayedOrders(orderReports);
  }, [handleSelectChange, handleChange])

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
  const day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29, 30];
  const years = [2022,2021,2020,2019,2018];

  return (
    <>
      <div className="tops">
        <Button onClick={() => {
          onMorePage(0);
        }}> <ArrowBack fontSize='large'/> </Button> 
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

      <br /><br /><br />

      <div>
      <div>
        <Select
          value={dateOption ?? " "}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
          defaultValue={dateOption}>
            <MenuItem value="week">This week</MenuItem>
            <MenuItem value="weekly">By Weeks</MenuItem>
            <MenuItem value="month">By Month</MenuItem>
            <MenuItem value="year">By Year</MenuItem>
        </Select>
          
            {     
              dateOption === 'weekly' ? days.map((item) => { 
                return("")
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

        <Table columns={colum} dataSource={displayOrders} />
      </div>
    </>  
  )
}
