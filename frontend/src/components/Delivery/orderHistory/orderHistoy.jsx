import React, {useEffect} from 'react'
import './orderHistory.css'
import { Box, Collapse, IconButton,
   Table, TableBody, TableCell,
    TableContainer, TableHead,
     TableRow, Typography, Paper} from '@material-ui/core';
// import { getOrders } from '../../../redux/actions/orderActions';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import Button from '@material-ui/core/Button';
import Label from '@material-ui/core/InputLabel';

import { useDispatch, useSelector } from 'react-redux';
import { getOrdersInprogress, getOrdersPending, getOrdersByDeliveryId } from '../../../redux/actions/orderActions';
import { getOrderDetails } from '../../../redux/actions/orderDetailAction';
import { changeOrderStatus } from '../../../redux/actions/orderActions'

import UserTableRow from '../../../components/ProductManager/orderRow/orderRow'
 
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Row from '../../../components/ProductManager/orderRow/orderRow';
import TableRows from '../orderTableRow/orderTableRow'
import axios from 'axios';

import {MenuItem, Select} from '@mui/material';
import { useCookies } from 'react-cookie';
import { useState } from 'react';

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function OrderHistory() {

  // const [orders , setOrders] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0);
  
  const [cookies, setCookie] = useCookies(['user']);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getOrdersByDeliveryId(cookies?.ADid));
  },[])
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue){
      dispatch(getOrdersInprogress());
    }else{
      dispatch(getOrdersPending());
    }
  };

  const orders = useSelector((state) => state.getOrder.orders);

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
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedOption] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
    // console.log(selectedOption + ':' + dateOption);
    // if(dateOption === 'month'){
    //   console.log('inside mnth: ' + event.target.value);
    // }else if(dateOption === 'year'){
    //   console.log('inside year: ' + event.target.value);
    // }
  };

  return (
    <>
      <main>  
        <div>
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
          <Select
          value={selectedMonth ?? " "}
          onChange={handleSelectChange}
          displayEmpty>
            {months.map((item) => {
              return(
                <MenuItem value={item.id}>{item.name}</MenuItem>
            )})}
          </ Select>
          <Select
            //value={selectedYear ?? " "}
            //onChange={handleSelectChange}
            // inputProps={{ 'aria-label': 'Without label' }
            displayEmpty>
              {days.map((item) => {
                return(
                  <MenuItem value={item}>{item}</MenuItem>
              )}) }
          </Select> 

        </div>
        <div className='orderTable_holder'>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead >
                <TableRow>
                  <TableCell />
                  <TableCell>Order Id</TableCell>
                  <TableCell align='right'>Date</TableCell>
                  <TableCell align="right">
                    Sub-Total</TableCell>
                  <TableCell align="right">
                    Location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                !orders?.length ? <div>empty</div> : (
                  orders.map((val, key) => {
                    console.log(val);
                    return (
                      <TableRows 
                        key = {val.orderId}   
                        id = {val.orderId}
                        date = {val.date}
                        latitude = {val.latitude} 
                        longitude = {val.longitude} 
                        contact = {val.contact} 
                        address = {val.address}
                        total = {val.total}
                        status = {val.status}
                        admin = {true}
                        />
                    )
                  }
                ))
              }
              </TableBody>
            </Table>
          </TableContainer>
        
        </div>
      </main>
    </>
    
  )
}