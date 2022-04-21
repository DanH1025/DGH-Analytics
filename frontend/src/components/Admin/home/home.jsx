import React, {useEffect} from "react";
import Chart from "react-apexcharts";
import './home.css'
import OrderMap from "../OrderMap/orderMap";

import Charts from '../../../components/Admin/charts';

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/actions/orderActions';
import { getOrderReports, getOrderTotal } from "../../../redux/actions/orderReportAction";

// const data = [
//   {
//     name: 'Monday',
//     uv: 4000,
//     pv: 2400,
//   },
//   {
//     name: 'Tuesday',
//     uv: 3000,
//     pv: 1398,
//   },
//   {
//     name: 'Wendnday',
//     uv: 2000,
//     pv: 9800,
//   },
//   {
//     name: 'Thursday',
//     uv: 2780,
//     pv: 3908,
//   },
//   {
//     name: 'Friday',
//     uv: 1890,
//     pv: 4800,
//   },
// ];


export default function Home() {

  const dispatch = useDispatch();

 	useEffect(() => {
    dispatch(getOrderTotal());
 	  dispatch(getOrderReports());
    dispatch(getOrders())
 	}, [dispatch]);
   

  const prices = [];
  const priceAverage = [];
  const dates = [];
  const orders = [];
  const orderTotals = useSelector((state) => state.getOrderTotal.total);
  const orderReports = useSelector((state) => state.getOrderReport.orderReports);
  
  let totalPrice = 0;
  let orderNo = 0;
  let average = 0;
  let topProdByQun = [];
  let topProdByPrice = [];
  {
    orderTotals?.map((repo) => {
      if(!repo.totalPrice === null){
        totalPrice = repo.totalPrice;
      }else{
        console.log('total price 0');
      }
      if(!repo.totalPrice === null){
        orderNo = repo.orders;
      }else{
        console.log('total order 0');
      }
      if(!repo.totalPrice === null){
        average = repo.average;
      }else{
        console.log('total average 0');
      }
      topProdByQun = repo.topProdByQun;
      topProdByPrice = repo.topProdByPrice;
    })
  } 
  console.log(topProdByQun);
  {
    orderReports?.map((order) => {
      // console.log(order);
      // console.log(order.total);
      dates.push(order.date);
      prices.push(order.total);
      orders.push(order.orders);
      priceAverage.push(order.average);
    })
  }
  console.log(orderReports);
  // console.log(prices);
  const stat = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: dates
      }
    },
    series: [
      {
        name: "order",
        data: prices
      }
    ]
  }

  return (
    <>
      <div className="charts">        
        <div className="chart">
          <Charts 
            title='Total Sales'
            middleTotal={'$' +  totalPrice }
            dates={dates}
            chartData={prices}
            chartType="line"
            />
        </div>
        <div className="chart">
          <Charts 
            title='Total Orders'
            middleTotal={orderNo}
            dates={dates}
            chartData={orders}
            chartType="line"
            />
        </div>
        <div className="chart">
          <Charts 
            title='Averages'
            middleTotal={average}
            dates={dates}
            chartData={priceAverage}
            chartType="line"
            />
        </div>
      </div>
      <div className="lineGraphHolder">     
      <div className="orders_container">
        <Chart
          options={stat.options}
          series={stat.series}
          type="bar"
          width='180%'
          height='100%'         
          />
      </div> 
      <div className="chart">
        <h3>Top product by unit sold</h3>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {topProdByQun?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row.productName}</TableCell>
                  <TableCell align="right">{row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div> 
      <div className="chart">
        <h3>Top product by price sold</h3>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {topProdByPrice?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{row.productName}</TableCell>
                  <TableCell align="right">${row.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div> 
   </div>
    
    <OrderMap/>
    </>
  )
}


{/* <ResponsiveContainer width="100%" height="100%"> */}
   {/* <LineChart
     width={500}
     // height={300}
     data={orderReports}
     margin={{
       top: 5,
       right: 30,
       left: 20,
       bottom: 5,
     }}
   >
     <XAxis dataKey="name" />
     <Line type="monotone" dataKey="total" stroke="#8884d8" /> 
   </LineChart> */}
 {/* </ResponsiveContainer>  */}

{/* <Chart
  options={stat.options}
  series={stat.series}

  type="bar"/> */}
