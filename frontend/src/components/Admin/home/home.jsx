import React, {useEffect} from "react";
import Chart from "react-apexcharts";
import './home.css'
import OrderMap from "../OrderMap/orderMap";

import Charts from '../../../components/Admin/charts';

import {Table, TableBody, TableCell, TableContainer, TableRow, Paper} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/actions/orderActions';
import { getOrderReports, getOrderTotal } from "../../../redux/actions/orderReportAction";
import { getUserLogDetail } from "../../../redux/actions/userLogActions";


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
    dispatch(getOrders());
    dispatch(getUserLogDetail());
 	}, [dispatch]);
   
  const orderTotals = useSelector((state) => state.getOrderTotal.total);
  const orderReports = useSelector((state) => state.getOrderReport.orderReports);
  const userLog = useSelector((state) => state.userCount.userLog);

  const days = ['Mon','Tue','Wen','Thu','Fri','Sat','Sun'];

  let totalUserNo = 0;
  let totalOrderNo = 0;
  let totalUserNoToday = 0;
  let addCartCount = 0;
  let reachedCheckout = 0;
  let purchaseCount = 0;
  let userByHour = [];
  {
    userLog?.map((userlog) => {
      console.log(userlog.noOFTotalUser);
      //if(!userlog.noOFTotalUser === null){
        totalUserNo = userlog.noOFTotalUser;
        totalOrderNo = userlog.noOFTotalOrder;
      
      //if(!userlog.noOfTotalUserByDate === null){
        totalUserNoToday = userlog.noOfTotalUserByDate;
      
      addCartCount = (userlog.cartCount/totalUserNo*100).toFixed(2);
      reachedCheckout = (userlog.checkCount/totalUserNo*100).toFixed(2);
      purchaseCount = (userlog.purchaseCount/totalUserNo*100).toFixed(2);
      userByHour = userlog.noOfTotalUserByDateHour;
    })
  }
  
  console.log('user log');
  console.log(totalUserNo);
  console.log(totalUserNoToday);
  console.log(Object.keys(userByHour));


  let totalPrice = 0;
  let orderNo = 0;
  let average = 0;
  let topProdByQun = [];
  let topProdByPrice = [];
  {
    orderTotals?.map((repo) => {
      if(!repo.totalPrice === null){
        totalPrice = repo.totalPrice;
      }
      if(!repo.totalPrice === null){
        orderNo = repo.orders;
      }
      if(!repo.totalPrice === null){
        average = repo.average;
      }
      topProdByQun = repo.topProdByQun;
      topProdByPrice = repo.topProdByPrice;
    })
  } 
  console.log(topProdByQun);
  
  const prices = [];
  const priceAverage = [];
  const dates = [];
  const orders = [];
  {
    orderReports?.map((order) => {
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
            dates={days}
            chartData={prices}
            chartType="line"
            />
        </div>
        <div className="chart">
          <Charts 
            title='Total Orders'
            middleTotal={orderNo}
            dates={days}
            chartData={orders}
            chartType="line"
            />
        </div>        
        <div className="chart">
          <Charts 
            title='Averages'
            middleTotal={average}
            dates={days}
            chartData={priceAverage}
            chartType="line"
            />
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <Charts 
            title='Total online store visitor'
            middleTotal={totalUserNoToday}
            dates={Object.keys(userByHour)}
            chartData={Object.values(userByHour)}
            chartType="bar"
            />
        </div>
        <div className="chart">
          <div className="info">
            <p>Online store conversion rate      .</p>
            <a href="#">view report</a>
          </div>
          <div className="info">
            <p className="price">{(totalOrderNo/totalUserNo*100).toFixed(2)} %</p>
            <p>2+</p>
          </div>
          <div className="info">
            <p className="price"></p>
            <p></p>
          </div>
          <div className="info">
            <p>Add to cart rate</p>
            <p>{addCartCount} %</p>
          </div>
          <div className="info">
            <p>Reaching checkout rate</p>
            <p>{reachedCheckout} %</p>
          </div>
          <div className="info">
            <p>Add to cart rate</p>
            <p>{purchaseCount} %</p>
          </div>
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
