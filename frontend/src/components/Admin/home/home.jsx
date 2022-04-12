import React, {useEffect} from "react";
import Chart from "react-apexcharts";
import './home.css'
import OrderMap from "../OrderMap/orderMap";
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
import { getOrderReports } from "../../../redux/actions/orderReportAction";

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
 	  dispatch(getOrderReports());
 	}, [dispatch]);

  const prices = [];
  const dates = [];
  const orders = useSelector((state) => state.getOrder.orders);
  const orderReports = useSelector((state) => state.getOrderReport.orderReports);

  console.log(orderReports);
  {
    orderReports?.map((order) => {
      // console.log(order);
      // console.log(order.total);
      dates.push(order.date);
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

  const query = "SELECT SUM(total) FROM `orders` WHERE status='complete' AND date='2022-04-08'";

  return (
    <>
<div className="lineGraphHolder">
      
        <div className="orders_container">
          <Chart
            options={stat.options}
            series={stat.series}
            type="bar"
            width='195%'
            height='100%'
            
            />
        </div>
        <div className="total_sale_container">
          Total sales
        {/* <ResponsiveContainer width="100%" height="100%"> */}
            {/* <LineChart              
              height={500}
              width={300}
              data={data}
             
              
            >
              <XAxis dataKey="name" />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" /> 
            </LineChart> */}
          {/* </ResponsiveContainer>  */}
        </div>
     </div>
      
      <OrderMap/>

    </>
  )
}

