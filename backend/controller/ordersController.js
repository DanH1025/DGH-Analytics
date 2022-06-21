const OrderModle = require('../model/orders');
const UserModel = require('../model/user');
const addOrder = (req, res) => {
  const date = req.body.date;
  const userId = req.body.userId;
  const total = req.body.total;  
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const contact = req.body.contact;
  const cost = req.body.cost;
  const no_item  = req.body.no_item;
  const address  = req.body.address;
  
  const orders = new OrderModle(date,userId,total, latitude, longitude, contact, cost, no_item, address);
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
  try {
    res.send(order);
  } catch (error) {
    console.log(error);
    res.status(400).send(error)
  }
}

const getCompleteOrders = async(req,res) => {
  const [order, metaData] = await OrderModle.fetchComplete();
  console.log(order);
 // res.send(order.splice(0,4));
  res.send(order);
}

const getPendingOrders = async(req,res) => {
  const [order, metaData] = await OrderModle.fetchOrdersPending();
  console.log(order);
 // res.send(order.splice(0,4));
  res.send(order);
}

const getOrdersbyId = async (req,res) => {
  const id = req.body.id;
    const [order, metaData] = await OrderModle.fetchAllbyUser(id)
  
  // console.log(order);
  try{
    res.send(order);
  }catch(e){
    res.status(401).send(e)
    console.log(e);
  }
}

const getOrdersbyDeliveryId = async (req,res) => {
  const id = req.body.id;
  const [order, metaData] = await OrderModle.fetchOrdersCompleteByDeliveryId(id)
  
  // console.log(order);
  try{
    res.send(order);
  }catch(e){
    res.status(401).send(e)
    console.log(e);
  }
}

const changeStatusAccept = async(req, res) => {
  const id = req.body.id;
  const status = "inProgress";
  const deliveryID = req.body.deliveryID;
  try{
    const [order, metaData] = await OrderModle.changeStatusAccept(id, status, deliveryID);
  } catch(e){
    console.log(e);
  }
  res.sendStatus(200);  
}

const changeStatusComplete = async(req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  const deliveredDate = new Date().toISOString().slice(0, 10);
  try{
    const [order, metaData] = await OrderModle.changeStatusComplete(id, status, deliveredDate);
  } catch(e){
    console.log(e);
  }
  res.sendStatus(200);  
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

const countOrderById = async(req, res) => {
  const id = req.body.id;
  const [order, metaData] = await OrderModle.countOrderById(id);
  const noOrders = order[0];
  console.log(noOrders);
  try{
    res.send(noOrders);  
  } catch(e){
    console.log(e);
  }
}

const getRecentOrderLocations = async (req,res)=>{
  const {id} = req.body;

  if(id === ''){
    res.json({
      status: 404,
      message: "User Not Found"
    })
  }else{
     const [data, metaData] = await OrderModle.fetchCompleteById(id);
     if(data.length === 0){
       res.json({
        status: 201,
        message: "User Has no Recent Orders"
       })
     }else {
       res.send(data)

     }
  }


}

module.exports = {
	addOrder,
  countOrderById,
	getOrders,
  getInprogressOrders,
  getOrdersbyId,
  changeStatus,
  getPendingOrders,
  changeStatusComplete,
  changeStatusAccept,
  getOrdersbyDeliveryId,
  getCompleteOrders,
  getRecentOrderLocations
};