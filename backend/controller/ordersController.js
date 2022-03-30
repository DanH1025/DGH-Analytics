const OrderModle = require('../model/orders');

const addOrder = (req, res) => {
  const date = req.body.date;
  const userId = req.body.userId;
  const total = req.body.total;
  const orders = new OrderModle(date,userId,total);
  console.log(orders);
  try{
    orders.save();
  }catch(e){
    console.log('orders error: ' + e);
  }
}

const getOrders = async(req,res) => {
  const [order, metaData] = await OrderModle.fetchAll()  
  console.log(order);
  res.send(order);
}


module.exports = {
	addOrder,
	getOrders,
};