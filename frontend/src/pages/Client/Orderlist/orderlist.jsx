import React, {useEffect, useState} from "react";
import './orderlist.css'
import Topbar from "../../../components/Client/topbar/topbar";
import Footer from "../../../components/Client/footer/footer";

import { useDispatch , useSelector } from "react-redux";
import { getOrdersById } from '../../../redux/actions/orderActions'


import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { Box, Collapse, IconButton,
  Table, TableBody, TableCell,
   TableContainer, TableHead,
    TableRow, Typography, Paper} from '@material-ui/core';

import Row from '../../../components/ProductManager/orderRow/orderRow';


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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    width: '90%',
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function Orderlist() {

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [value, setValue] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getOrdersById(26));
  }, [dispatch]);

  const orders = useSelector((state) => state.getOrder.orders);

    return(
      <>
        <Topbar />
        <div className="wishlistContainer">
          <div className="wishlistWrapper">
            <div className="headerBar">
              <p className='headerBarContent'>Home / Orderlist</p>
            </div>
            <div className="wishlistTitle">
              <h2 className='cartTitleContent' >Order List </h2>
            </div> 


            <div className="bottomTabContainer">       
					
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

              	<Tab label="Orders"  {...a11yProps(0)} />
              	<Tab label="History" {...a11yProps(1)}/>
            	</Tabs>
            </AppBar>

						<TabPanel value={value} index={0}>
							discription
              <TableContainer className="tableOrder" component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Id</TableCell>
                      <TableCell align="right">
                        Fullname</TableCell>
                      <TableCell align="right">
                        LastName</TableCell>
                      <TableCell align="right">
                        Email</TableCell>
                      <TableCell align="right">
                        Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                      !orders?.length ? <div>empty</div> : (
                        orders.map((val, key) => {
                          // console.log(val);
                          if(val.status === 'pending'){
                            return (
                              <Row 
                              key = {val.orderId}   
                              id = {val.orderId}
                              fname = {val.userFirstName}
                              lname = {val.userLastName}
                              email = {val.userEmail} 
                              total = {val.total}
                              status = {val.status} />
                            )
                          }
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
                        Fullname</TableCell>
                      <TableCell align="right">
                        LastName</TableCell>
                      <TableCell align="right">
                        Email</TableCell>
                      <TableCell align="right">
                        Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {
                      !orders?.length ? <div>empty</div> : (
                        orders.map((val, key) => {
                          // console.log(val);
                          if(val.status != 'pending' ){
                            return (
                              <Row 
                              key = {val.orderId}   
                              id = {val.orderId}
                              fname = {val.userFirstName}
                              lname = {val.userLastName}
                              email = {val.userEmail} 
                              total = {val.total}
                              status = {val.status} />
                            )
                          }
                        }
                      ))
                  }
                  </TableBody>
                </Table>
              </TableContainer>
						</TabPanel>
                
          </div>
        </div>

          

          </div>
        </div>
        <Footer /> 
        </>
    )
}

