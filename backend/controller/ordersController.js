const OrderModle = require('../model/orders');

const addOrder = (req, res) => {
  const date = req.body.date;
  const userId = req.body.userId;
  const total = req.body.total;  
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const contact = req.body.contact;
  const cost = req.body.cost;
  const no_item  = req.body.no_item;
  
  const orders = new OrderModle(date,userId,total, latitude,longitude, contact, cost, no_item);
  // console.log(orders);
  try{
    orders.save();
  }catch(e){ 
    console.log('orders error: ' + e);
  }
} 

const getOrders = async(req,res) => {
  const [order, metaData] = await OrderModle.fetchAll()  
  // console.log(order);
 // res.send(order.splice(0,4));
  res.send(order);
}

const getInprogressOrders = async(req,res) => {
  const [order, metaData] = await OrderModle.fetchInprogress();
  console.log(order);
 // res.send(order.splice(0,4));
  res.send(order);
}

const getOrdersbyId = async(req,res) => {
  const id = req.body.id;
  const [order, metaData] = await OrderModle.fetchAllbyUser(id)  
  // console.log(order);
  res.send(order);
}

const changeStatus = async(req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  try{
    const [order, metaData] = await OrderModle.changeStatus(id, status);
  } catch(e){
    console.log(e);
  }
  res.sendStatus(200);  
}


module.exports = {
	addOrder,
	getOrders,
  getInprogressOrders,
  getOrdersbyId,
  changeStatus,
};