const OrderDetailModel = require('../model/orderDetail');

const addOrderDetail = (req, res) => {
  const orderId = req.body.orderId;
  const productId = req.body.productId;
  const productQuantity = req.body.productQuantity;
  const price  = req.body.price;
  
  //const [orderId , productId , productQuantity, latitude, longitude] = req.body;
  const orderDetails = new OrderDetailModel(orderId, productId, productQuantity , price);
  try{ 
    // console.log(orderDetails); 
    orderDetails.save();
  }catch(e){
    console.log('order detail error: ' + e);
  }
}
 
const getOrderDetails = async(req,res) => {
  const id = req.body.id;
  const [order, metaData] = await OrderDetailModel.fetchAll(id);
  // console.log(order);
  res.send(order);
}


module.exports = {
	addOrderDetail,
	getOrderDetails,
};  