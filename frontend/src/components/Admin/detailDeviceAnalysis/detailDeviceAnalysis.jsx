import React from 'react'
import './detailDeviceAnalysis.css'

// import { Table , Switch , message, Button} from 'antd';
import { Button} from 'antd';

import Chart from "react-apexcharts";

import {ArrowBack} from '@material-ui/icons';
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
export default function DetailDeviceAnalysis({onMorePage}) {

  const dispatch = useDispatch();
  const [searchInput , setSearchInput] = useState('');

 	useEffect(() => {
    dispatch(getUserLogDetail());
  }, [searchInput])
   
  const userLog = useSelector((state) => state.userCount.userLog);
  console.log(userLog);

  let deviceType = [];
  {
    userLog?.map((userlog) => {
      deviceType = userlog.deviceType;
    })
  }
  let deviceValue = [];
  deviceType.map((val) => {
    deviceValue = Object.values(val);
    console.log(deviceValue[0]);
  })
  // console.log(deviceType[0].values());

  const days = ['Mon','Tue','Wen','Thu','Fri','Sat','Sun'];
  
  const stat = {
    series: [Number(deviceValue[0]), Number(deviceValue[1]), Number(deviceValue[2])],
    options: {
      chart: {
        width: 380,
        type: 'donut',
      },
      labels: ['Phone', 'Tablet', 'Desktop'],
      // responsive: [{
      //   breakpoint: 480,
      //   options: {
      //     chart: {
      //       width: 200
      //     },
      //     legend: {
      //       position: 'bottom'
      //     }
      //   }
      // }]
    },
  }

  const colum = [
    {
      title: 'Device type',
      dataIndex: Object.keys(deviceType),
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Session',
      dataIndex: Object.values(deviceType),
      key: 'age',
    },
    {
      title: 'Percentage',
      dataIndex: 'addToCart',
      key: 'address',
    }
  ];

  return (
    <>
      <div className="tops">
        <Button onClick={() => {
          onMorePage(0);
        }}> <ArrowBack fontSize='large'/> </Button>
        <h3>Session by Device type</h3>
      </div>
      <div>
        {/* <Table columns={colum} dataSource={deviceType} /> */}
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead >
                <TableRow>
                  <TableCell>Device type</TableCell>
                  <TableCell align="right">
                  Session</TableCell>
                  <TableCell align="right">Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                !deviceType?.length ? <div>empty</div> : (
                  deviceType.map((val, key) => {
                    const total = Number(val.phone)+Number(val.desktop)+Number(val.tablet);
                    console.log(total);
                    return (
                    <>
                      <TableRow 
                      sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell component="th" scope="row">
                          Phone</TableCell>
                        <TableCell align="right">
                          {val.phone}</TableCell>
                        <TableCell align="right">
                          {((val.phone/total)*100).toFixed(2)} %</TableCell>
                      </TableRow>
                      <TableRow 
                      sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell component="th" scope="row">
                          Tablet</TableCell>
                        <TableCell align="right">
                          {val.tablet}</TableCell>
                        <TableCell align="right">
                        {((val.tablet/total)*100).toFixed(2)} %</TableCell>
                      </TableRow>
                      <TableRow 
                      sx={{ '& > *': { borderBottom: 'unset' } }}>
                        <TableCell component="th" scope="row">
                          Desktop</TableCell>
                        <TableCell align="right">
                          {val.desktop}</TableCell>
                        <TableCell align="right">
                          {((val.desktop/total)*100).toFixed(2)} %</TableCell>
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
        <h3>Session by device type</h3>
          <ReactApexChart 
            options={stat.options} 
            series={stat.series} 
            className="pieChart"
            type="donut" 
            width="600px"
            height="600px" />
      </div>
    </>  
  )
}
