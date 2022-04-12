const db = require('../database/dbConn')

module.exports = class Request {
  
  constructor(orderId, productId, productQuantity, price){
    this.orderId = orderId;
    this.productId = productId;
    this.productQuantity = productQuantity;
    this.price = price;
 
  }

  save() {
    console.log('in order detail modle');
    
    try{
      db.execute('INSERT INTO orderdetails (orderId, productId, productPrice, productQuantity) VALUES (?,?,?,?)', 
      [ this.orderId, 
        this.productId,
        this.price,
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