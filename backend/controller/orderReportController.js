const OrderModle = require('../model/orders');
const OrderReportModel = require('../model/orderReport');
const OrderDetailModel = require('../model/orderDetail');

const addOrderReport = async (req, res) => {
  let date = new Date().toISOString().slice(0, 10);
  console.log('now date: ');
  console.log(date);
  // date = '2022-04-13';
  const sum = await OrderModle.totalSum(date);
  console.log('sum:');
  console.log(sum[0][0]["SUM(total)"]);
  let total = sum[0][0]["SUM(total)"];

  const cost = await OrderModle.totalCost(date);
  console.log('cost:');
  console.log(cost[0][0]["SUM(total)"]);
  let cos = cost[0][0]["SUM(cost)"];
  // console.log(sum);

  const no_item = await OrderModle.totalItem(date);
  console.log('cost:');
  console.log(no_item[0][0]["SUM(no_item)"]);
  let items = no_item[0][0]["SUM(no_item)"];
  // console.log(sum);

  const no_orders = await OrderModle.completeOrderComplete(date);
  console.log('order count: ');
  console.log(no_orders[0][0]["COUNT(status)"]);
  const order = no_orders[0][0]["COUNT(status)"];

  const average = total/order;
  console.log('average' + average);
  
  let orders;
  if (total === null || order === null) {
    orders = new OrderReportModel(date,0,0, 0,0,0);
  }else{
    orders = new OrderReportModel(date,total,average, order, cos, items);
  }
  console.log(orders);
  try{
    orders.save();
    res.send(orders);
  }catch(e){
    console.log('orders report error: ' + e);
  }
}

const getOrderReports = async(req,res) => {
  const [order, metaData] = await OrderReportModel.fetchAll();
  // console.log(order);
  res.send(order);
}

const updateReports = async(req,res) => {
  let date = new Date().toISOString().slice(0, 10);
  console.log('now date: ');
  console.log(date);
  date = '2022-04-02';

  const cost = await OrderModle.totalCost(date);
  console.log('cost:');
  console.log(cost[0][0]["SUM(total)"]);
  let cos = cost[0][0]["SUM(cost)"];
  // console.log(sum);

  const no_item = await OrderModle.totalItem(date);
  console.log('cost:');
  console.log(no_item[0][0]["SUM(no_item)"]);
  let items = no_item[0][0]["SUM(no_item)"];

  const [order, metaData] = await OrderReportModel.updateCost(cos, items, date);
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

  const topProd = await OrderDetailModel.topProductByQuantityLIM5();
  console.log('top product');
  // console.log(topProd[0]);

  const topProdByPrice = await OrderDetailModel.topProductByPriceLIM5();

  const den = [
    {
      'totalPrice': total, 
      'orders': orderNo, 
      'average': ave, 
      'topProdByQun': topProd[0], 
      'topProdByPrice': topProdByPrice[0]
    }
  ]
  res.send(den);
}


module.exports = {
	addOrderReport,
	getOrderReports,
  getLastWeekOrderReports,
  getTotalOrder,
  updateReports
};