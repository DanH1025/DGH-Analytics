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

  static topProductByQuantity() {
    try{
       const result =db.execute('SELECT id, productId, SUM(productQuantity) AS total FROM `orderdetails` GROUP BY productId ORDER BY SUM(productQuantity) DESC');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static topProductByQuantityLIM5() {
    try{
       const result =db.execute('SELECT id, productId, SUM(productQuantity) AS total FROM `orderdetails` GROUP BY productId ORDER BY SUM(productQuantity) DESC LIMIT 5');
       return result;
    }catch(err){
      console.log(err);
    }
  }
}