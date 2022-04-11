import React, {useEffect} from "react";
import Chart from "react-apexcharts";
import './home.css'

import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/actions/orderActions';

const data = [
  {
    name: 'Monday',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Tuesday',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Wendnday',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Thursday',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'Friday',
    uv: 1890,
    pv: 4800,
  },
];




export default function Home() {

  const dispatch = useDispatch();

 	useEffect(() => {
 	  dispatch(getOrders());
 	}, [dispatch]);

  const prices = [];
  const orders = useSelector((state) => state.getOrder.orders);
  // console.log(orders);
  {
    orders?.map((order) => {
      // console.log(order);
      // console.log(order.total);
      prices.push(order.total);
    })
  }
  // console.log(prices);

  const stat = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Monday", "Tuesday", 1993, 1994, 1995, 1996, 1997, 1998]
      }
    },
    series: [
      {
        name: "series-1",
        data: prices
      }
    ]
  }

  const query = "SELECT SUM(total) FROM `orders` WHERE status='complete' AND date='2022-04-08'";

  return (
    <>
      <h2>Home Overview</h2>
      <div className="chart">
        Total sales
       {/* <ResponsiveContainer width="100%" height="100%"> */}
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" /> 
          </LineChart>
        {/* </ResponsiveContainer>  */}
      </div>
      <div className="chart">
        <Chart
          options={stat.options}
          series={stat.series}
          type="line"
          width="500"/>
      </div>
    </>
  )
}
