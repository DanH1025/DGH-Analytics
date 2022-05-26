const db = require('../database/dbConn')

module.exports = class Request {
  constructor(date, total, average, orders, cost, no_item ,session, addToCart, reachedCheckout, converted){
    this.date = date;
    this.total = total;
    this.average = average;
    this.orders = orders;
    this.cost = cost;
    this.no_item = no_item;
    this.session = session;
    this.addToCart = addToCart;
    this.reachedCheckout = reachedCheckout;
    this.converted = converted;
  }

  save() {
    console.log('in order report modle');
    // const date = new Date().toISOString().slice(0, 10);
    try{
      db.execute('INSERT INTO orderreport (date, total, average, orders,cost ,no_item, session, addToCart, reachedCheckout, converted) VALUES (?,?,?,?,?,?,?,?,?,?)', 
      [ 
        this.date,
        this.total,
        this.average,
        this.orders,
        this.cost,
        this.no_item,
        this.session,
        this.addToCart,
        this.reachedCheckout,
        this.converted
      ])
    }catch(e){
      console.log("order reporrt save error: " + e);
    }
  }

  static fetchAll() {
    try{
       const result =db.execute('SELECT * FROM orderreport');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchLastWeek() {
    try{
       const result =db.execute('SELECT * FROM orderreport ORDER BY date DESC LIMIT 7');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchLastFour() {
    try{
       const result =db.execute('SELECT * FROM orderreport ORDER BY date DESC LIMIT 4');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static totalSum(date) {
    try{
       const result =db.execute("SELECT SUM(total) AS totals FROM orders WHERE status = 'complete' AND date=? ", [date]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static updateCost(cost, item, date) {
    try{
       const result =db.execute("UPDATE `orderreport` SET `cost` = ?, `no_item`=? WHERE `orderreport`.`date` = ?", [cost, item, date]);
       return result;
    }catch(err){
      console.log(err);
    }
  }
}