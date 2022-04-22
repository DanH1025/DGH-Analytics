const OrderModel = require('../model/orders')
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

const getUserLogs = async(req,res) => {
  const [userNo, metaData] = await OrderLogModel.fetchTotalUser();
  console.log(userNo[0]['userNo']);

  const [orderNo, etaData] = await OrderModel.completeOrderCompleteAll();
  console.log(orderNo[0]['orderNo']);
  
  const [userByDate, metaDat] = await OrderLogModel.fetchTotalUserByDate('2022-04-14');
  console.log(userByDate[0]['userToday']);
  let days;

  const [cartCount, metData] = await OrderLogModel.addToCartCount();
  console.log('%%%%%%%%%%');
  console.log(cartCount[0]['cartCount']);

  const [checkCount, meData] = await OrderLogModel.reachCheckCount();
  console.log('%%%%%%%%%%');
  console.log(checkCount[0]['checkoutCount']);

  const [purchaseCount, meDat] = await OrderLogModel.purchaseCount();
  console.log('%%%%%%%%%%');
  console.log(purchaseCount[0]['purchaseCount']);
  
  var hour = new Date().getHours();
  let dayData = {};
  hour = 11;
  let j = hour - 4;
  let i = hour;
  for(i; i>j; i--){
    // console.log('hour: ' + i);
    const [userByHour, metaDa] = await OrderLogModel.fetchTotalUserByDateHour('2022-04-14', i);
    // console.log(userByHour[0]['userHour']);
    dayData[i+'PM'] = userByHour[0]['userHour'];
  }

  // dayData = dayData.filter(Number);
  
  //console.log(dayData['8']);

  const respon = [
    {
      'noOFTotalUser' : userNo[0]['userNo'],
      'noOFTotalOrder' : orderNo[0]['orderNo'],
      'noOfTotalUserByDate' : 
        userByDate[0]['userToday'],
      'cartCount' : cartCount[0]['cartCount'],
      'checkCount' : checkCount[0]['checkoutCount'],
      'purchaseCount' : 
        purchaseCount[0]['purchaseCount'],
      'noOfTotalUserByDateHour' : dayData
    }
  ]
  res.send(respon);
}


module.exports = {
	addOrderLog,
  getOrderLogs,
  getUserLogs,
};