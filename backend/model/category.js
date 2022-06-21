const db = require('../database/dbConn')

module.exports = class Request {
  
  constructor(categoryName, categoryValue, categoryImg){
    this.categoryName = categoryName;
		this.categoryValue = categoryValue;
		this.categoryImg = categoryImg;
  }

  save() {
    console.log('in category modle');
    try{
      db.execute('INSERT INTO `category` (`ctgr_title`, `ctgr_value`, `ctgr_rating`, `ctgr_img`) VALUES (?,?,?,?)', 
      [ 
        this.categoryName, 
        this.categoryValue,
        5,
        this.categoryImg  
      ])
    }catch(e){
      console.log("category save error: " + e);
    }
  }

  static fetchAll(id) {
    try{
       const result =db.execute('SELECT * FROM `category` WHERE 1');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchAllCategory(){
    try {
      const result = db.execute('SELECT * FROM category');
      return result;
    } catch (error) {
        console.log(err)  
    }
  }

}