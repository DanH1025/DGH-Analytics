const db = require('../database/dbConn')

module.exports = class Request {
  constructor(date, userId, total){
    this.orderId = date;
    this.userId = userId;
    this.total = total;
  }

  save() {
    console.log('in order modle');
    const date = "11-23-5666";
    try{
      db.execute('INSERT INTO orders (orderId, userId, total, date) VALUES (?,?,?,?)', 
      [ 
        this.orderId,
        this.userId, 
        this.total,
        date
      ])
    }catch(e){
      console.log("order save error: " + e);
    }
  }

  static fetchAll() {
    try{
       const result =db.execute('SELECT orders.orderId, users.userFirstName, users.userLastName, users.userEmail, orders.total FROM orders INNER JOIN users ON orders.userId = users.userId');
       return result;
    }catch(err){
      console.log(err);
    }
  }
}