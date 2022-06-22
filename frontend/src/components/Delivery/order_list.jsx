import React, {useEffect} from 'react'
import './order_list.css'
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
import { getOrdersInprogress, getOrdersPending } from '../../redux/actions/orderActions';
import { getOrderDetails } from '../../redux/actions/orderDetailAction';
import { changeOrderStatus } from '../../redux/actions/orderActions'

import UserTableRow from '../../components/ProductManager/orderRow/orderRow'
 
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Row from '../../components/ProductManager/orderRow/orderRow';
import TableRows from './orderTableRow/orderTableRow'
import axios from 'axios';
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

export default function Order_list() {

  // const [orders , setOrders] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getOrdersPending());
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
  

  return (
    <>
    
        <div className='deliveryOrderTable'>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              aria-label="scrollable force tabs">

              <Tab label="Orders"  {...a11yProps(0)} />
              <Tab label="In progress" {...a11yProps(1)}/>
            </Tabs>
          </AppBar>

          <TabPanel value={value} index={0}>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead >
                  <TableRow>
                    <TableCell />
                    <TableCell><p className='deliveryOrderListTableHeader'> Order Id</p></TableCell>
                    <TableCell><p className='deliveryOrderListTableHeader'> Date</p></TableCell>
                    <TableCell align="right">
                    <p className='deliveryOrderListTableHeader'> Sub-Total</p>
                    </TableCell>
                    <TableCell align="center">
                    <p className='deliveryOrderListTableHeader'> Location</p>
                    </TableCell>
                    <TableCell align="center">
                    <p className='deliveryOrderListTableHeader'> Action</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {
                  !orders?.length ? <div>No Orders</div> : (
                    orders.map((val, key) => {
                      console.log(val);
                      return (
                        <TableRows 
                          key = {val.orderId}   
                          id = {val.orderId}
                          date = {val.date}
                          contact = {val.contact} 
                          longitude = {val.longitude}
                          latitude = {val.latitude} 
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
          </TabPanel>

          <TabPanel value={value} index={1}>          
            <TableContainer className="tableOrder" component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Id</TableCell>
                    <TableCell align="right">
                      Date</TableCell>
                    <TableCell align="right">
                      Total</TableCell>
                    <TableCell align="right">
                      Address</TableCell>
                    <TableCell align="right">
                      Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {
                    !orders?.length ? <div>no order</div> : (
                      orders.map((val, key) => {
                        console.log(val.longitude);
                        return (
                          <TableRows 
                          key = {val.orderId}   
                          id = {val.orderId}
                          date = {val.date}
                          contact = {val.contact}
                          address = {val.address}
                          longitude = {val.longitude}
                          latitude = {val.latitude} 
                          total = {val.total}
                          admin = {true}
                          fname = {val.fname}
                          lname = {val.lname}
                          status = {val.status} />
                        )
                      }
                    ))
                }
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          
        </div>
      
    </>
    
  )
}
