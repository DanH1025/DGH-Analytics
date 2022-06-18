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
  

  return (
    <>
      <main>  
        <div className='orderTable_holder'>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead >
                <TableRow>
                  <TableCell />
                  <TableCell>Order Id</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="right">
                    Sub-Total</TableCell>
                  <TableCell align="right">
                    Location</TableCell>
                  <TableCell align="right">Status</TableCell>
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
                        contact = {val.contact} 
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
