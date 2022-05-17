const OrderModle = require('../model/orders');

const addOrder = (req, res) => {
  const date = req.body.date;
  const userId = req.body.userId;
  const total = req.body.total;  
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const contact = req.body.contact;
  const orders = new OrderModle(date,userId,total, latitude,longitude, contact);
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
  res.send(order);
}


module.exports = {
	addOrder,
	getOrders,
};