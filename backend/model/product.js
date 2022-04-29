
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
      db.execute('INSERT INTO product (productName,productPrice,productBrand,productCategory,productDetail,productImg, countInStock, status, visits) VALUES (?,?,?,?,?,?,?,?,?)', [this.productName, this.productPrice, this.productBrand, this.productCategory, this.productDetail, this.productImg, 10, 1, 0]);
    }catch(err){
      console.log('asdfasdf' + err);
    }
  }

  static fetchActive() {
    try{
       const result =db.execute('SELECT * FROM product WHERE status = ?', [1]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  //fetch all categories function
  static fetchAllCategory(){
    try {
      const result = db.execute('SELECT * FROM category');
      return result;
    } catch (error) {
        console.log(err)
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

  static deleteProductById(id){
    return db.execute('UPDATE `product` SET `status`= 0 WHERE product.id=?' , [id])
  }

  static updateProduct(id,name,price,brand,category,detail,image,count_in_stock,status){
    return db.execute("UPDATE `product` SET `productName`= ? ,`productDetail`= ?,`productPrice`=?,`productCategory`=?,`productBrand`=?,`countInStock`=?  WHERE id=?" , [name,detail,price,category,brand,count_in_stock,id])
  }

  static findByName(name) {
    return db.execute('SELECT * FROM product WHERE product.productName LIKE ?', ["%"+name+"%"]);
  }

  static findByNameCategory(name, category) {
    return db.execute('SELECT * FROM product WHERE productCategory = ? AND product.productName LIKE ?', [category, "%"+name+"%"]);
  }

  //record search 
  static recordSearch(name, catagory){
   const date = new Date()
    return db.execute('INSERT INTO search_history (search_key, search_category , search_date) VALUES (?,?,?)', [name,catagory ,date]);
  }
  //record add_to_cart
  static recordAddToCart(id, quantity ){
    const date = new Date();
    return db.execute('INSERT INTO cart_history (product_id, qty, date) VALUES (?,?,?)' , [id , quantity , date]);

  }

  static addVisits(id){
    return db.execute('UPDATE product SET visits = visits + 1 WHERE product.id = ?', [id]);
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
