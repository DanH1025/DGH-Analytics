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
  
  const [userByDate, metaDat] = await OrderLogModel.fetchTotalUserByDate('2022-04-14');
  console.log(userByDate[0]['userToday']);
  let days;
  
  var hour = new Date().getHours();
  let dayData = {};
  hour = 12;
  let j = hour - 4;
  let i = hour;
  for(i; i>j; i--){
    console.log('hour: ' + i);
    const [userByHour, metaDa] = await OrderLogModel.fetchTotalUserByDateHour('2022-04-14', i);
    console.log(userByHour[0]['userHour']);
    dayData['i'].push(userByHour[0]['userHour']);
  }

  dayData = dayData.filter(Number);
  
  console.log(dayData);

  const respon = [
    {
      'noOFTotalUser' : userNo[0]['userNo'],
      'noOfTotalUserByDate' : userByDate[0]['userToday'],
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