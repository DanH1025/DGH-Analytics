const OrderLogModel = require('../model/orderLog');

const addOrderLog = async (req, res) => {
  const {href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time} = req.body;

  const log = new OrderLogModel(href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time);
  console.log(log);
  try{
    log.save();
  }catch(e){
    console.log('orders log error: ' + e);
  }
}

const getOrderLogs = async(req,res) => {
  const [logs, metaData] = await OrderLogModel.fetchAll();
  // console.log(order);
  res.send(logs);
}


module.exports = {
	addOrderLog,
  getOrderLogs,
};