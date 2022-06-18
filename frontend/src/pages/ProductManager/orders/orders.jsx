import React, {useEffect} from 'react'
import './orders.css'
import { Box, Collapse, IconButton,
   Table, TableBody, TableCell,
    TableContainer, TableHead,
     TableRow, Typography, Paper} from '@material-ui/core';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { Table } from "react-bootstrap";
// Bootstrap CSS
// import "bootstrap/dist/css/bootstrap.min.css";
// // To make rows collapsible
// import "bootstrap/js/src/collapse.js";
// import { getOrders } from '../../../redux/actions/orderActions';

import { useDispatch, useSelector } from 'react-redux';
import { getOrdersInprogress, getOrdersPending, getOrders, getOrdersComplete } from '../../../redux/actions/orderActions';


import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import UserTableRow from '../../../components/ProductManager/orderRow/orderRow'
 
import Row from '../../../components/ProductManager/orderRow/orderRow';
import axios from 'axios';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    width: '90%',
    backgroundColor: theme.palette.background.paper,
  },
}));

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

export default function Orders() {

  // const [orders , setOrders] = useState([]);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if(newValue === 0){
      dispatch(getOrdersPending());
    }else if(newValue === 1){
      dispatch(getOrdersInprogress());
    }else{
      dispatch(getOrdersComplete());
    }
  };

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const fetchAllOrders = async() =>{
    const response = await axios.post('http://localhost:5000/api/getOrders');
    // setOrders(response.data)
  }

  useEffect(()=>{
    // fetchAllOrders();
    dispatch(getOrdersPending());
  },[])

  const orders = useSelector((state) => state.getOrder.orders);

  return (
    <>
      <main>  
        <div>
          <div className='orderTable_holder'>

          <div className={classes.root}>
            <AppBar position="static" color="default">
							<Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs">

              	<Tab label="Pending Orders"  {...a11yProps(0)} />
              	<Tab label="Inprogress Orders" {...a11yProps(1)}/>
              	<Tab label="Complete Orders" {...a11yProps(2)}/>
            	</Tabs>
            </AppBar>

						<TabPanel value={value} index={0}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead >
                    <TableRow>
                      <TableCell />
                      <TableCell>Order Id</TableCell>
                      <TableCell>Date</TableCell>
                      {/* <TableCell>Last name</TableCell> */}
                      <TableCell align="right">
                        Sub-Total</TableCell>
                      <TableCell align="right">Status</TableCell>
                    
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                      !orders?.length ? <div>empty</div> : (
                        orders.map((val, key) => {
                          console.log(val);
                          return (
                            <Row 
                              key = {val.orderId}   
                              id = {val.orderId}
                              fname = {val.fname}
                              lname = {val.lname}
                              contact = {val.contact === null ? val.contact : null} 
                              total = {val.total}
                              date = {val.date}
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
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead >
                    <TableRow>
                      <TableCell />
                      <TableCell>Order Id</TableCell>
                      <TableCell>Date</TableCell>
                      {/* <TableCell>Last name</TableCell> */}
                      <TableCell align="right">
                        Sub-Total</TableCell>
                      <TableCell align="right">Status</TableCell>
                    
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                      !orders?.length ? <div>empty</div> : (
                        orders.map((val, key) => {
                          console.log(val);
                          return (
                            <Row 
                              key = {val.orderId}   
                              id = {val.orderId}
                              fname = {val.fname}
                              lname = {val.lname}
                              contact = {val.contact === null ? val.contact : null} 
                              total = {val.total}
                              date = {val.date}
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

						<TabPanel value={value} index={2}>          
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead >
                    <TableRow>
                      <TableCell />
                      <TableCell>Order Id</TableCell>
                      <TableCell>Date</TableCell>
                      {/* <TableCell>Last name</TableCell> */}
                      <TableCell align="right">
                        Sub-Total</TableCell>
                      <TableCell align="right">Status</TableCell>
                    
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                      !orders?.length ? <div>empty</div> : (
                        orders.map((val, key) => {
                          console.log(val);
                          return (
                            <Row 
                              key = {val.orderId}   
                              id = {val.orderId}
                              fname = {val.fname}
                              lname = {val.lname}
                              date = {val.date}
                              contact = {val.contact === null ? val.contact : null} 
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
                
          </div>

            {/* <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="uk-table-shrink" />
                  <th className="uk-table-shrink" />
                  <th>Id</th>
                  <th>Fullname</th>
                  <th>LastName</th>
                  <th>email</th>
                  <th>total</th>
                </tr>
              </thead>
              <tbody>
                {
                  !orders.length ? <div>empty</div> : (
                    orders.map((val, key) => {
                      console.log(val);
                      return (
                        <>
                        <tr data-toggle="collapse"
                            data-target=".multi-collapse1"
                            aria-controls="multiCollapseExample1">
                          <th className="uk-table-shrink" />
                          <th className="uk-table-shrink" />
                          <th>{val.orderId} </th>
                          <th>{val.userFirstName}</th>
                          <th>{val.userLastName}</th>
                          <th>{val.userEmail} </th>
                          <th>{val.total}</th>
                        </tr>
                        <tr class="collapse multi-collapse1" id="multiCollapseExample1">
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                          <td>Child col 1</td>
                        </tr>
                        </>
                      )
                    }) 
                  )
                }
              </tbody>
            </Table> */}
          </div>
        </div>
      </main>
    </>
    
  )
}
