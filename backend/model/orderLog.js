const db = require('../database/dbConn')

module.exports = class Request {
  constructor(href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time){
    this.href = href;
    this.referrer = referrer; 
    this.screenWidth = screenWidth; 
    this.screenHeight = screenHeight; 
    this.addToCart = addToCart; 
    this.reachedCheckout = reachedCheckout; 
    this.purchased = purchased;
    this.date = date;
    this.time = time; 
  }

  save() {
    console.log('in order log modle');
    // const date = new Date().toISOString().slice(0, 10);
    try{
      db.execute("INSERT INTO user_log (href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time) VALUES (?,?,?,?,?,?,?,?,?)", 
      [ 
        this.href,
        this.referrer,
        this.screenWidth,
        this.screenHeight,
        this.addToCart,
        this.reachedCheckout,
        this.purchased,
        this.date,
        this.time
      ])
    }catch(e){
      console.log("order log save error: " + e);
    }
  }

  static fetchAll() {
    try{
       const result =db.execute('SELECT * FROM user_log');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchTotalUser() {
    try{
       const result =db.execute('SELECT COUNT(id) AS userNo FROM user_log');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static addToCartCount() {
    try{
       const result =db.execute('SELECT COUNT(addToCart) AS cartCount FROM `user_log` WHERE addToCart = true');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static reachCheckCount() {
    try{
       const result =db.execute('SELECT COUNT(reachedCheckout) AS checkoutCount FROM `user_log` WHERE reachedCheckout = true');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static purchaseCount() {
    try{
       const result =db.execute('SELECT COUNT(purchased) AS purchaseCount FROM `user_log` WHERE purchased = true;');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchTotalUserByDate(date) {
    try{
       const result =db.execute('SELECT COUNT(id) AS userToday FROM user_log WHERE date=?', [date]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchTotalUserByDateHour(date, hour) {
    try{
       const result =db.execute('SELECT COUNT(id) AS userHour FROM user_log WHERE date=? AND time LIKE ?', [date, hour + ':%']);
       return result;
    }catch(err){
      console.log(err);
    }
  }
}