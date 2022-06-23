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
import { Button } from "@material-ui/core";

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

export default function Home({onMorePage}) {

  const dispatch = useDispatch();

 	useEffect(() => {
    dispatch(getOrderTotal());
 	  dispatch(getOrderReports());
    dispatch(getOrders());
    dispatch(getUserLogDetail());
 	}, []);
   
  const orderTotals = useSelector((state) => state.getOrderTotal.total);
  const orderReports = useSelector((state) => state.getOrderReport.orderReports);
  const userLog = useSelector((state) => state.userCount.userLog);

  const days = ['Fri','Sat','Sun','Mon','Tue','Wen','Thu',];

  let totalUserNo = 0;
  let totalOrderNo = 0;
  let totalUserNoToday = 0;
  let addCartCount = 0;
  let reachedCheckout = 0;
  let purchaseCount = 0;
  let userByHour = [];
  let deviceType = [];
  let locations = [];
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
      purchaseCount = (totalOrderNo/totalUserNo*100).toFixed(2);
      userByHour = userlog.noOfTotalUserByDateHour;
      deviceType = userlog.deviceType;
      locations = userlog.location;
    })
  }
  
  console.log('user log');
  console.log(deviceType);
  // console.log(totalUserNoToday);
  // console.log(Object.keys(userByHour));


  let totalPrice = 0;
  let orderNo = 0;
  let average = 0;
  let topProdByQun = [];
  let topProdByPrice = [];
  {
    orderTotals?.map((repo) => {
      if(repo.totalPrice){
        totalPrice = repo.totalPrice;
        console.log(repo.totalPrice);
      }else{
        console.log(repo.totalPrice);
      }
      if(repo.orders){
        orderNo = repo.orders;
      }
      if(repo.average){
        average = repo.average;
      }
      topProdByQun = repo.topProdByQun;
      topProdByPrice = repo.topProdByPrice;
    })
  } 
  // console.log(topProdByQun);
  
  const prices = [];
  const priceAverage = [];
  const dates = [];
  const orders = [];
  {
    orderReports?.map((order) => {
      dates.push((order.date).slice(5));
      prices.push(order.total);
      orders.push(order.orders);
      priceAverage.push(order.average);
    })
  }

  // console.log(orderReports);
  // console.log(prices);
  const stat = {
    options: {
      chart: {
        id: "basic-bar",
        title: "Order"
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
      <div className="dashboardChartHolder">
        <div className="chartWrapper">
              <h2>Todays Status</h2>
            <div className="todaysCharts">
              <div className="chart">
                  <Charts 
                    title='Total Sales'
                    middleTotal={ totalPrice + ' ETB'   }
                    dates={days.reverse()}
                    // persent = {}
                    chartData={prices.reverse()}
                    chartType="area"
                    index={7}
                    onPageChange={onMorePage}
                    />
                </div>
                <div className="chart">
                  <Charts 
                    title='Total No Of Orders'
                    middleTotal={orderNo}
                    dates={days.reverse()}
                    // persent = {2}
                    chartData={orders.reverse()}
                    chartType="area"
                    index={7}
                    onPageChange={onMorePage}
                    />
                </div>        
                <div className="chart">
                  <Charts 
                    title='Average sale per Order'
                    middleTotal={average + ' ETB' }
                    // persent = {2}
                    dates={days.reverse()}
                    chartData={priceAverage.reverse()}
                    chartType="area"
                    index={8}
                    onPageChange={onMorePage}
                    />
                </div>  
            </div>
            <h2>Website Status</h2>
            <div className="webStatus">
              <div className="chart">
                  <Charts 
                    title='Total online store visitor'
                    middleTotal={totalUserNoToday}
                    persent = {(orderNo/totalUserNoToday*100).toFixed(0)}
                    dates={Object.keys(userByHour).reverse()}
                    chartData={Object.values(userByHour).reverse()}
                    chartType="bar"
                    index={9}
                    onPageChange={onMorePage}
                    />
                </div>
                  <div className="chart">
                  <div className="conversion_rate_holder">
                    <div className="cr_title">
                      <p className="cr_title_content" >Store Conversion Rate</p>
                      <span className="cr_title_more">
                        <Button onClick={() => {
                          onMorePage(9)
                          }}>More</Button> 
                      </span>
                    </div>
                    <div className="price_conversion_rate">
                      <p>{(totalOrderNo/totalUserNo*100).toFixed(2)} %</p>
                    </div>
                    <div className="cart_cr">
                      <p className="cart_cr_title">Add To Cart Rate</p>
                      <p className="cart_cr_content">{addCartCount} %</p>
                    </div>
                    <div className="checkout_cr">
                      <p className="checkout_cr_title">Reaching Checkout Rate</p>
                      <p className="checkout_cr_content">{reachedCheckout} %</p>
                    </div>
                    <div className="purchase_cr">
                      <p className="purchase_cr_title">Purchase</p>
                      <p className="purchase_cr_content">{purchaseCount} %</p>
                    </div>

                  </div>                
                </div>
                <div className="chart">
                <div className="chart">  
                  <div className="cr_title">
                    <p className="cr_title_content" >device type</p>
                    <span className="cr_title_more">
                      <Button onClick={() => {
                        onMorePage(10)
                        }}>More</Button> 
                    </span>
                  </div>
                </div> 
                  <TableContainer component={Paper}>
                    <Table className="unit_sell_table" aria-label="simple table">
                      <TableBody>
                        {deviceType?.map((row, index) => (
                          index <5 && (
                          <div className="conversion_rate_holder">
                            <div className="cart_cr">
                              <p className="cart_cr_title">Phone</p>
                              <p className="cart_cr_content">{((row.phone/totalUserNo)*100).toFixed(2) } % </p>
                            </div>
                            <div className="checkout_cr">
                              <p className="checkout_cr_title">Tablet</p>
                              <p className="checkout_cr_content">{((row.tablet/totalUserNo)*100).toFixed(2) } %</p>
                            </div>
                            <div className="purchase_cr">
                              <p className="purchase_cr_title">Desktop</p>
                              <p className="purchase_cr_content">{((row.desktop/totalUserNo)*100).toFixed(2) } %</p>
                            </div>
          
                          </div> 
                        )))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
            </div>
            
            <h2>About Products</h2>

            <div className="aboutProducts">
                <div className="chart">
                    {/* <h3 className="unit_sell_title">Top product by unit sold</h3> */}

                    <div className="cr_title">
                      <p className="cr_title_content" >Top product by unit sold</p>
                      <span className="cr_title_more">
                        <Button onClick={() => {
                          onMorePage(12)
                          }}>More</Button> 
                      </span>
                    </div>

                    <TableContainer component={Paper}>
                      <Table className="unit_sell_table" aria-label="simple table">
                        <TableBody>
                          {topProdByQun?.map((row, index) => (
                            index <5 && (
                            <TableRow
                              key={row.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell className="product_name" align="left">  {row.productName}
                              </TableCell>
                              <TableCell className="total_sold" align="right">{row.sold}</TableCell>
                            </TableRow>)
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div> 

                    <div className="chart">
                  
                  <div className="cr_title">
                    <h3 className="product_price_sold_title">
                      Top product by price sold</h3>
                    <span className="cr_title_more">
                      <Button onClick={() => {
                        onMorePage(12)
                        }}>More</Button> 
                    </span>
                  </div>

                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableBody>
                        {topProdByPrice?.map((row, index) => (
                          index <5 && (
                          <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="left">{row.productName}</TableCell>
                            <TableCell align="right">{row.totalSale} ETB</TableCell>
                          </TableRow>)
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>

                
                <div className="chart">
                {/* <h3 className="unit_sell_title">Top product by unit sold</h3> */}

                <div className="cr_title">
                  <p className="cr_title_content" >Top location</p>
                  <span className="cr_title_more">
                    <Button onClick={() => {
                      onMorePage(11)
                      }}>More</Button> 
                  </span>
                </div>

                <TableContainer component={Paper}>
                  <Table className="unit_sell_table" aria-label="simple table">
                    <TableBody>
                      {locations?.map((row, index) => (
                        index <5 && (
                        <TableRow
                          key={row.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell className="product_name" align="left">  {row.city}
                          </TableCell>
                          <TableCell className="total_sold" align="right">{row.state}</TableCell>
                          <TableCell className="total_sold" align="right">{row.session}</TableCell>
                        </TableRow>)
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div> 

            </div>
            <h2>Order Information</h2>

            <div className="orderInfo">
              <div className="lineGraphHolder">  
                <p>Orders</p>
                <div className="orders_container">
                  <Chart
                    className="order_barChart"
                    title='Orders'
                    options={stat.options}
                    series={stat.series}
                    type="bar"
                    height='200%'
                    width='325%' />
                </div>
              </div>
            </div>
              

             

               

              
            
           

              

             

            </div>
          
            

            <div>
              <Button onClick={() => {
                onMorePage(8);
              }}>Change more</Button>
            </div>
      
             <OrderMap/>
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
