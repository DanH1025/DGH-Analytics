import React, {useEffect} from "react";
import Chart from "react-apexcharts";
import './home.css'

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
  {
    orderTotals?.map((repo) => {
      totalPrice = repo.totalPrice;
      orderNo = repo.orders;
      average = repo.average;
    })
  } 
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
  // console.log(prices);


  return (
    <>
      <div className="charts">        
        <div className="chart">
          <Charts 
            title='Total Sales'
            middleTotal={'$' + totalPrice}
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