const db = require('../database/dbConn')

module.exports = class Request {
  constructor(date, userId, total, latitude, longitude , contact){
    this.orderId = date;
    this.userId = userId;
    this.total = total;
    this.latitude = latitude;
    this.longitude = longitude;
    this.contact = contact;
  }

  save() {
    console.log('in order modle');
    console.log('userId');
    console.log(this.userId);
    const date = new Date().toISOString().slice(0, 10);
    try{
      db.execute('INSERT INTO orders (orderId, userId, total, date,status, latitude,longitude, contact) VALUES (?,?,?,?,?,?,?,?)', 
      [ 
        this.orderId,
        this.userId, 
        this.total,
        date,
        'complete', 
        this.latitude,
        this.longitude,
        this.contact,
      ])
    }catch(e){
      console.log("order save error: " + e);
    }
  }

  static fetchAll() {
    try{
       const result =db.execute('SELECT orders.orderId, user.fname, user.lname, user.email, orders.total , orders.latitude,orders.longitude,orders.contact , orders.status FROM orders INNER JOIN user ON orders.userId = user.id');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchAllbyUser(id) {
    try{
       const result =db.execute('SELECT orders.orderId, user.fname, user.lname, user.email, user.phone_number, orders.total , orders.latitude,orders.longitude,orders.contact , orders.status FROM orders INNER JOIN user ON orders.userId = user.id WHERE user.id = ?', [id]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static totalSum(date) {
    try{
       const result =db.execute("SELECT SUM(total) FROM orders WHERE status = 'complete' AND date=?", [date]);
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
       const result =db.execute("SELECT COUNT(status) FROM orders WHERE status = 'complete' AND date=?", [date]);
      //  console.log(result);
       return result;
    }catch(err){
      console.log(err);
    }
  }


}