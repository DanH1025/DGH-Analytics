const db = require('../database/dbConn')

module.exports = class Request {
  
  constructor(orderId, productId, productQuantity){
    this.orderId = orderId;
    this.productId = productId;
    this.productQuantity = productQuantity;
  }

  save() {
    console.log('in order detail modle');
    const prid = 123;
    try{
      db.execute('INSERT INTO orderdetails (orderId, productId, productPrice, productQuantity) VALUES (?,?,?,?)', 
      [ this.orderId, 
        this.productId,
        prid,
        this.productQuantity
      ])
    }catch(e){
      console.log("order save error: " + e);
    }
  }

  static fetchAll() {
    try{
       const result =db.execute('SELECT * FROM orderdetails');
       return result;
    }catch(err){
      console.log(err);
    }
  }
}