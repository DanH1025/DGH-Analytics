
const db = require('../database/dbConn')

module.exports = class Request { 
  constructor(productName,productPrice,productBrand,productCategory,productDetail,productImg){
    this.productName = productName;
    this.productPrice = productPrice;
    this.productBrand = productBrand;
    this.productCategory = productCategory;
    this.productDetail = productDetail;
    this.productImg = productImg;
  }

  save() {
    console.log('date save: ' + this.date);
    try{
      db.execute('INSERT INTO product (productName,productPrice,productBrand,productCategory,productDetail,productImg) VALUES (?,?,?,?,?,?)', [this.productName, this.productPrice, this.productBrand, this.productCategory, this.productDetail, this.productImg]);
    }catch(err){
      console.log('asdfasdf' + err);
    }
  }

  static fetchAll() {
    try{
       const result =db.execute('SELECT * FROM product');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchSearch(name) {
    try{
       const result =db.execute('SELECT * FROM product WHERE product.productName = ?', [name]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchByCategory(name) {
    try{
       const result =db.execute('SELECT * FROM product WHERE product.productCategory = ?', [name]);
       return result;
    }catch(err){
      console.log(err);
    }
  }
  
  static findById(id) {
    return db.execute('SELECT * FROM product WHERE product.id = ?', [id]);
  }

  // static fetchNew() {
  //   try{
  //      const result =db.execute('SELECT * FROM product WHERE requests.status = "pending"');
  //      return result;
  //   }catch(err){
  //     console.log(err);
  //   }
  // }


  // static fetchSearchLicense(name) {
  //   try{
  //      const result =db.execute('SELECT * FROM requests WHERE requests.License_number = ?', [name]);
  //      return result;
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  // static fetchType() {
  //   return db.execute('select mineral_type, count(*) as val from component.requests group by mineral_type');
  // }

  // static fetchCountry() {
  //   return db.execute('select country, count(*) as val from component.requests group by country;');
  // }

  // static changeStatus(response , id) {
  //   try{
  //     return db.execute('UPDATE requests SET requests.status = "done", requests.response = ? WHERE (requests.id = ?)', [response, id]);
  //   }catch(err){
  //     console.log(err);
  //   }
  // }

};
