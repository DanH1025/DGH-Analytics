const OrderModel = require('../model/orders')
const OrderLogModel = require('../model/orderLog');

const addOrderLog = async (req, res) => { 
  const {href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time,state, county, userId} = req.body;

  const log = new OrderLogModel(href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time,state, county,userId);
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

const getDeviceType = async(req,res) => {
  const [logs, metaData] = await OrderLogModel.fetchDeviceType();
  // console.log(order);
  res.send(logs);
}

const getUserByHistory = async(req,res) => {
  const date = req.body.date;
  const day = req.body.day;

  const [logs, metaData] = await OrderLogModel.fetchByUserHistory(date, day);
  // console.log(logs);
  res.send(logs);
}

const getUserByActivity = async(req,res) => {
  // const date = req.body.date;
  const day = req.body.days;
  const date = new Date().toISOString().slice(0, 10);
  console.log(date);
  const [logs, metaData] = await OrderLogModel.fetchUserByActivity(date, day);
  // console.log(logs);
  res.send(logs);
}

const getUserLogInHour = async(req, res) => {
  let date = req.body.date;

   date = new Date().toISOString().slice(0, 10);
  date = '2022-05-16';

  let dayData = {};
  for(let i = 0; i<24; i++){
    // console.log('hour: ' + i);
    const [userByHour, metaDa] = await OrderLogModel.fetchTotalUserByDateHour(date, i);
    // console.log(userByHour[0]['userHour']);
    dayData[formatAMPM(i)] = userByHour[0]['userHour'];
  }

  res.send(dayData);
}

const getUserLogs = async(req,res) => {
  const date = new Date().toISOString().slice(0, 10);
  const [userNo, metaData] = await OrderLogModel.fetchTotalUser();
  console.log(userNo[0]['userNo']);

  const [orderNo, etaData] = await OrderModel.completeOrderCompleteAll();
  console.log(orderNo[0]['orderNo']);
  
  const [userByDate, metaDat] = await OrderLogModel.fetchTotalUserByDate(date);
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

  const [logs, metaData12] = await OrderLogModel.fetchDeviceType();

  const [location, metaData123] = await OrderLogModel.fetchByLocation();
 
  
  var hour = new Date().getHours();
  
  let dayData = {};
  // hour = 11;
  let j = hour - 4;
  let i = hour;
  for(i; i>j; i--){
    // console.log('hour: ' + i);
    const [userByHour, metaDa] = await OrderLogModel.fetchTotalUserByDateHour(date, i);
    // console.log(userByHour[0]['userHour']);
    dayData[formatAMPM(i)] = userByHour[0]['userHour'];
  }

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
      'noOfTotalUserByDateHour': dayData,
      'deviceType': logs,
      'location': location
    }
  ]
  res.send(respon);
}


function formatAMPM(hour) {
  var hours = hour;
  var minutes = 56;
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ' ' + ampm;
  return strTime;
}

module.exports = {
	addOrderLog,
  getOrderLogs,
  getUserLogs,
  getUserLogInHour,
  getUserByHistory,
  getDeviceType,
  getUserByActivity
};