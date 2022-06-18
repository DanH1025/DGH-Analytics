import React, {useState} from 'react';
import './orderRow.css'

import { Box, Collapse, IconButton, 
  Table, TableBody, TableCell, 
  TableContainer, TableHead,
   TableRow, Typography,
    Paper} from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Label from '@material-ui/core/InputLabel';

import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../../redux/actions/orderDetailAction';
import { changeOrderStatus } from '../../../redux/actions/orderActions'



export default function Row(props) {
  // const { row } = props;
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(!open);
    const id = props.Order_id;
    dispatch(getOrderDetails(props.id));
  }
  
  const handleCancelOrder = () => {
    console.log(props.id);
    dispatch(changeOrderStatus(props.id, 'cancel'))
    window.location.reload(false);
  }

  const orders = useSelector((state) => state.getOrderDetail.orderDetails);
  console.log('inside row');
  return (
    <React.Fragment>
      <TableRow 
      sx={{ '& > *': { borderBottom: 'unset' } }}
      className={ props.status === 'complete' ? 'comRow' 
      : props.status === 'cancel' ? 'canRow' 
      : props.status === 'pending' ? 'penRow' : 'inProg'}>
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
          {props.id}
        </TableCell>

        { props.admin === true ? ( 
            <TableCell align="left">
              {props.id}</TableCell>)
          : (
            <>
            <TableCell align="right">{props.fname}</TableCell>
            <TableCell align="right">{props.lname}</TableCell>
            <TableCell align="right">{props.email}</TableCell></>
          )
          
        }
        

        <TableCell align="right">{props.total}</TableCell>
        
        { props.status === 'pending' ? (
          <TableCell align="right">
            <Button className='btn' onClick={handleCancelOrder} style={{border: '1px solid black'}}>Cancel</Button>
          </TableCell>
        ): props.status === 'inProgress' ? (
        <TableCell align="right">
          <Label className='btn'>In progress</Label>
        </TableCell>) : ''
        }
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
                  {orders?.map((order) => (
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

              {/* {orders.map((order) => ( 
              <div className='cartItem'>
                <div className="cartItemHolder">
                  <div className='cartItem_img'>
                    <Link to={`/productDetails/${order.product}`}>
                      <img src={order.imageUrl}  alt={order.productName} />
                    </Link>
                  </div>

                  <p className='cartItem_brand'>{order.brand}</p>

                  <Link to={`/productDetails/${order.product}`}>
                    <p className='cartItem_name'>{order.productName}</p>            
                  </Link>
                  
                  <p className='cartItem_price'>${order.productPrice}</p>

                  <p className='cartItem_price'>${order.productQuantity}</p>

                  </div>
                </div>

               ))} */}


            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
