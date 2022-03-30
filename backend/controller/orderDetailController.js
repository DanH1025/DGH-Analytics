const OrderDetailModel = require('../model/orderDetail');

const addOrderDetail = (req, res) => {
  const orderId = req.body.orderId;
  const productId = req.body.productId;
  const productQuantity = req.body.productQuantity;
  const orderDetails = new OrderDetailModel(orderId, productId, productQuantity);
  try{
    console.log(orderDetails);
  }catch(e){
    console.log('order detail error: ' + e);
  }
  orderDetails.save();
}

const getOrderDetails = async(req,res) => {
  const [order, metaData] = await OrderModle.fetchAll()  
  console.log(order);
  res.send(order);
}


module.exports = {
	addOrderDetail,
	getOrderDetails,
};