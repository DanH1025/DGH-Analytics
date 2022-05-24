import React, {useState} from 'react';
import './orderRow.css'
// import { render } from 'react-dom';
// import { slideDown, slideUp } from 'anim';
// // import {slideDown, slideUp} from 'react-slidedown'
// import { render } from 'react-dom';
// import { slideDown, slideUp } from 'anim';
// import {slideDown, slideUp} from 'react-slidedown'
import { Box, Collapse, IconButton, 
  Table, TableBody, TableCell, 
  TableContainer, TableHead,
   TableRow, Typography,
    Paper} from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import Button from '@material-ui/core/Button';
import Label from '@material-ui/core/InputLabel';

import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../../redux/actions/orderDetailAction';

export default function Row(props) {
  // const { row } = props;
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(!open);
    const id = props.Order_id;
    dispatch(getOrderDetails(id));
  }
  const orders = useSelector((state) => state.getOrderDetail.orderDetails);
  console.log('inside row');
  return (
    <React.Fragment>
      <TableRow 
      sx={{ '& > *': { borderBottom: 'unset' } }}
      className={props.status === 'complete' ? 'comRow' 
      : props.status === 'canceled' ? 'canRow' : 'penRow'}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleClick}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.Order_id}
        </TableCell>
        <TableCell align="right">{props.contact}</TableCell>
        <TableCell align="right">{props.total}</TableCell>
        <TableCell align="right">{props.status}</TableCell>
        

      </TableRow>
      <TableRow>
        <TableCell 
        style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell align="right">Catagory</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell component="th" scope="row">
                        {order.productName}
                      </TableCell>
                      <TableCell>{order.productPrice}</TableCell>
                      <TableCell align="right">{order.productCategory}</TableCell>
                      <TableCell align="right">
                        {order.productQuantity}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
