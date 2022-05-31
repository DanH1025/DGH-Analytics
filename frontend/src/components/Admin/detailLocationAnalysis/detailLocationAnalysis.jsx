import React from 'react'
import './detailLocationAnalysis.css'

// import { Table , Switch , message, Button} from 'antd';
import { Button} from 'antd';

import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';
import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts ,deleteProductById ,editProduct } from '../../../redux/actions/productActions';

// import { Button } from "@material-ui/core";

import { Select } from 'antd';
import axios from 'axios';

import { getOrders } from '../../../redux/actions/orderActions';
import { getOrderReports, getOrderTotal } from "../../../redux/actions/orderReportAction";
import { getUserLogDetail } from "../../../redux/actions/userLogActions";
import { Box, Collapse, IconButton,
  Table, TableBody, TableCell,
   TableContainer, TableHead,
    TableRow, Typography, Paper} from '@material-ui/core';
const { Option } = Select;
export default function DetailLocationAnalysis({onMorePage}) {

  const dispatch = useDispatch();
  const [searchInput , setSearchInput] = useState('');

 	useEffect(() => {
    dispatch(getUserLogDetail());
  }, [searchInput])
   
  const userLog = useSelector((state) => state.userCount.userLog);
  console.log(userLog);

  let location = [];
  {
    userLog?.map((userlog) => {
      location = userlog.location;
    })
  }

  const stat = {
    series: location.map((a) => a.session),
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: location.map((a) => a.state),
    },
  }

  return (
    <>
      <div className="tops">
        <Button style={{display: 'inline'}} onClick={() => {
          onMorePage(0);
        }}> Go Back </Button> 
        Session by Location type
      </div>
      <div>
        {/* <Table columns={colum} dataSource={deviceType} /> */}
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead >
                <TableRow>
                  <TableCell>County</TableCell>
                  <TableCell align="right">
                  Region</TableCell>
                  <TableCell align="right">Visitors</TableCell>
                  <TableCell align="right">City</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                !location?.length ? <div>empty</div> : (
                  location.map((val, key) => {
                    return (
                    <>
                      <TableRow 
                      sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell component="th" scope="row">
                          {val.city}</TableCell>
                        <TableCell align="right">
                          {val.city}</TableCell>
                        <TableCell align="right">
                          {val.state}</TableCell>
                        <TableCell align="right">
                          {val.session}</TableCell>
                      </TableRow>
                    </>
                    )
                  }
                ))
              }
              </TableBody>
            </Table>
          </TableContainer>
      </div>

      <br /><br /><br />

      <div className="cha">
        <h3>Average order value</h3>
        <ReactApexChart 
          options={stat.options} 
          series={stat.series} 
          type="pie" 
          width="600px"
          height="600px" />

      </div>
    </>  
  )
}