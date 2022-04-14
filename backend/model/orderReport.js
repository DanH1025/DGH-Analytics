const db = require('../database/dbConn')

module.exports = class Request {
  constructor(date, total, average, orders){
    this.date = date;
    this.total = total;
    this.average = average;
    this.orders = orders;
  }
// INSERT INTO `orderreport`( `date`, `total`, `average`, `orders`) VALUES ('2022-04-08',1100,240,5)
  save() {
    console.log('in order report modle');
    // const date = new Date().toISOString().slice(0, 10);
    try{
      db.execute('INSERT INTO orderreport (date, total, average, orders) VALUES (?,?,?,?)', 
      [ 
        this.date,
        this.total,
        this.average,
        this.orders
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
}