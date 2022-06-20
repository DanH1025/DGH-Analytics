const db = require('../database/dbConn')

module.exports = class Request {
  constructor(date, userId, total, latitude, longitude , contact, cost, no_item, address){
    this.orderId = date;
    this.userId = userId;
    this.total = total;
    this.latitude = latitude;
    this.longitude = longitude;
    this.contact = contact;
    this.cost = cost;
    this.no_item = no_item;
    this.address = address;
  }

  
  save() {
    console.log('in order modle');
    console.log('userId');
    console.log(this.orderId);
    // const fullDate = new Date();
    const date = new Date().toISOString().slice(0, 10);
    try{
      db.execute('INSERT INTO orders (orderId, userId, total, date,status, latitude,longitude, contact, cost, no_item, address) VALUES (?,?,?,?,?,?,?,?,?,?,?)', 
      [ 
        this.orderId,
        this.userId, 
        this.total,
        date,
        'pending', 
        this.latitude,
        this.longitude,
        this.contact,
        this.cost,
        this.no_item,
        this.address
      ])
    }catch(e){
      console.log("order save error: " + e);
      return e;
    }
  }

  static fetchAll() {
    try{
       const result =db.execute('SELECT orders.orderId, user.fname, user.lname, user.email, orders.total ,orders.latitude, orders.no_Item, orders.longitude, orders.address, orders.contact , orders.status, orders.cost, orders.no_item FROM user INNER JOIN orders ON orders.userId = user.id');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchComplete() {
    try{
       const result =db.execute('SELECT orders.orderId, user.fname, user.lname, user.email, orders.total , orders.latitude, orders.longitude,orders.contact ,orders.no_Item, orders.status, orders.cost, orders.date, orders.address, orders.no_item FROM user INNER JOIN orders ON orders.userId = user.id WHERE orders.status = ? OR orders.status = ? ORDER BY orders.date DESC LIMIT 20', ["complete", "cancel"]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchInprogress() {
    try{
       const result =db.execute('SELECT orders.orderId, user.fname, user.lname, user.email, orders.total , orders.latitude,orders.longitude,orders.contact , orders.status,orders.address, orders.no_Item, orders.date, orders.cost, orders.no_item FROM user INNER JOIN orders ON orders.userId = user.id WHERE orders.status = ?' , ["inProgress"]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchOrdersPending() {
    try{
       const result = db.execute('SELECT * FROM orders WHERE orders.status = "pending"');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchOrdersCompleteByDeliveryId(id) {
    try{
       const result = db.execute('SELECT * FROM orders WHERE orders.status = "complete" AND orders.deliveryPerson = ? ORDER BY deliveredDate', [id]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static  fetchAllbyUser = (id) => {
    return db.execute('SELECT orders.orderId, user.fname, user.lname, user.email, user.phone_number, orders.total, orders.date, orders.no_Item , orders.latitude,orders.longitude, orders.address, orders.contact , orders.status, orders.cost, orders.no_item FROM orders INNER JOIN user ON orders.userId = user.id WHERE user.id = ?', [id]);   
  }

  static totalSum(date) {
    try{
       const result =db.execute("SELECT SUM(total) FROM orders WHERE status = 'complete' AND deliveredDate = ?", [date]);
       return result;
      //  console.log(result);
    }catch(err){
      console.log(err);
    }
  }

  static countOrderById(id) {
    try{
       const result =db.execute("SELECT COUNT(orderId) AS orderNo FROM `orders` WHERE status = 'inProgress' AND deliveryPerson = ?", [id]);
       return result;
      //  console.log(result);
    }catch(err){
      console.log(err);
    }
  }

  static totalCost(date) {
    try{
       const result =db.execute("SELECT SUM(cost) FROM orders WHERE status = 'complete' AND deliveredDate=?", [date]);
       return result;
      //  console.log(result);
    }catch(err){
      console.log(err);
    }
  }

  static totalItem(date) {
    try{
       const result =db.execute("SELECT SUM(no_item) FROM orders WHERE status = 'complete' AND deliveredDate=?", [date]);
       return result;
      //  console.log(result);
    }catch(err){
      console.log(err);
    }
  }

  static completeOrderCompleteAll() {
    try{
       const result =db.execute("SELECT COUNT(status) AS orderNo FROM orders WHERE status = 'complete'");
      //  console.log(result);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static completeOrderComplete(date) {
    try{
       const result =db.execute("SELECT COUNT(status) FROM orders WHERE status = 'complete' AND deliveredDate=?", [date]);
      //  console.log(result);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static changeStatusAccept(id, status, deliveryID) {
    try{
       const result =db.execute("UPDATE orders SET status = ?, deliveryPerson = ? WHERE orderId = ?", [status, deliveryID, id]);
      //  console.log(result);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static changeStatusComplete(id, status, deliveredDate) {
    try{
       const result =db.execute("UPDATE orders SET status = ?, deliveredDate = ? WHERE orderId = ?", [status, deliveredDate, id]);
      //  console.log(result);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static changeStatus(id, status) {
    try{
       const result =db.execute("UPDATE orders SET status = ? WHERE orderId = ?", [status, id]);
      //  console.log(result);
       return result;
    }catch(err){
      console.log(err);
    }
  }


}