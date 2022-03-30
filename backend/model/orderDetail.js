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

  static fetchAll(id) {
    try{
       const result =db.execute('SELECT orderdetails.id, product.productName, product.productPrice, product.productCategory, orderdetails.productQuantity FROM orderdetails INNER JOIN product ON orderdetails.productId = product.id WHERE orderdetails.orderId = ?', [id]);
       return result;
    }catch(err){
      console.log(err);
    }
  }
}