const OrderModle = require('../model/orders');
const OrderReportModel = require('../model/orderReport')

const addOrderReport = async (req, res) => {
  const date = new Date().toISOString().slice(0, 10);
  console.log('now date: ');
  console.log(date);

  const sum = await OrderModle.totalSum(date);
  console.log('sum:');
  console.log(sum[0][0]["SUM(total)"]);
  let total = sum[0][0]["SUM(total)"];
  // console.log(sum);

  const no_orders = await OrderModle.completeOrderComplete(date);
  console.log('order count: ');
  console.log(no_orders[0][0]["COUNT(status)"]);
  const order = no_orders[0][0]["COUNT(status)"];

  const average = total/order;
  console.log('average' + average);
  
  const orders = new OrderReportModel(date,total,average, order);
  console.log(orders);
  try{
    orders.save();
  }catch(e){
    console.log('orders report error: ' + e);
  }
}

const getOrderReports = async(req,res) => {
  const [order, metaData] = await OrderReportModel.fetchAll();
  // console.log(order);
  res.send(order);
}

const getLastWeekOrderReports = async(req,res) => {
  const [order, metaData] = await OrderReportModel.fetchLastWeek(); 
  // console.log(order);
  res.send(order);
}

const getTotalOrder = async(req,res) => {
  const date = new Date().toISOString().slice(0, 10);
  const sum = await OrderModle.totalSum(date);
  console.log('sum:');
  console.log(sum[0][0]["SUM(total)"]);
  let total = sum[0][0]["SUM(total)"];

  const no_orders = await OrderModle.completeOrderComplete(date);
  console.log('order count: ');
  console.log(no_orders[0][0]["COUNT(status)"]);
  const orderNo = no_orders[0][0]["COUNT(status)"];

  const ave = total/orderNo;

  const den = [{'totalPrice': total, 'orders': orderNo, 'average': ave}]
  res.send(den);
}


module.exports = {
	addOrderReport,
	getOrderReports,
  getLastWeekOrderReports,
  getTotalOrder,
};