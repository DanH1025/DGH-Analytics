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

}