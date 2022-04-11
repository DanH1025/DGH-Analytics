const db = require('../database/dbConn')

module.exports = class Request {
  constructor(date, userId, total){
    this.orderId = date;
    this.userId = userId;
    this.total = total;
  }

  save() {
    console.log('in order modle');
    const date = new Date().toISOString().slice(0, 10);
    try{
      db.execute('INSERT INTO orders (orderId, userId, total, date, status) VALUES (?,?,?,?,?)', 
      [ 
        this.orderId,
        this.userId, 
        this.total,
        date,
        'complete'
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

  static totalSum(date) {
    try{
       const result =db.execute("SELECT SUM(total) FROM orders WHERE status = 'complete' AND date=?", [date]);
       return result;
      //  console.log(result);
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