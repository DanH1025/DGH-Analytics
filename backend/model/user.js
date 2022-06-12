const db = require('../database/dbConn')

module.exports = class Request {
  constructor(fname,lname,email,phone, password, date,status){
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.phone =phone;
    this.password = password;
    this.date = date; 
    this.status = status;
  }

  save() {
    
    try{
      db.execute('INSERT INTO user (fname,lname,email,phone_number,password,signUpDate,status) VALUES (?,?,?,?,?,?,?)', 
      [  
        this.fname,
        this.lname,
        this.email,
        this.phone, 
        this.password,
        this.date,
        this.status
      ])

    }catch(e){
      console.log("user save error: " + e);
    }
  }

  static addAccessKey(email,date, AK){
    try {
      const result = db.execute('INSERT INTO `administrator_user`(`email`, `user_role`, `sign_up_date`, `access_key`, `status`) VALUES (?,?,?,?,?)', [email, "product_manager", date , AK , "pending"]);
      return result
    } catch (error) {
      console.log(error)
    }
  }

  static fetchPhone(phone){
    try {
      const result = db.execute('SELECT * FROM user WHERE phone_number=?', [phone]);
      return result;
    } catch (error) {
      console.log(error)
    }
  }

  static fetchEmail(email){
    try {
      const result = db.execute('SELECT * FROM user WHERE email=?', [email]);
      return result;
    } catch (error) {
      console.log(error)
    }
  }

  static fetchAllUsers(){
    try {
      const result = db.execute('SELECT * FROM user');
      return result;
    } catch (error) {
      console.log(error)
    }
  }
  
  static fetchAll(email, password) {
    try{
       const result =db.execute('SELECT * FROM user WHERE userEmail=? AND password=?', [email, password]);
       return result;
    }catch(err){
      console.log(err);
    }
  }
  
  static checkUser(phone) {
    try{
       const result =db.execute('SELECT EXISTS(SELECT * from user WHERE phone_number=?)', [phone]);
       return result;
    }catch(err){
      console.log(err);
    }
  }
  
  static checkEmail(email) {
    try{
       const result =db.execute('SELECT EXISTS(SELECT * from user WHERE email=?)', [email]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static createAdminUser (userName , email ,date, password,key ){
    try{
      const result =db.execute('INSERT INTO `administrator_user`(`user_name`, `email`, `user_role`, `sign_up_date`, `password` , `access_key`) VALUES (?,?,?,?,?,?)', [userName , email , "product_manager" , date, password,key])
      return result;
    }catch(error){
   
      console.log(error)
    }
  }

  static updateAdmin (userName, email, password){
    try {
       const result = db.execute("UPDATE administrator_user SET user_name = ? ,password = ?   WHERE email = ? ", [userName, password, email]);
       return result;
    } catch (error) {
      console.log(error)
    }
  }

  static activatePM( email ,activation){
    try {
      const result = db.execute("UPDATE administrator_user SET status = ?   WHERE email = ? ", [activation, email]);
      return result;
    } catch (error) {
      console.log(error)
    }
  }

  static fetchAdminUser (email){
    try {
      const result = db.execute("SELECT * FROM administrator_user WHERE email=? " , [email]);
      return result;
    } catch (error) {
      return error
    }
  }

  static fetchNewPM (){
    try {
       const result = db.execute("SELECT `id`, `user_name`, `email`, `user_role`, `sign_up_date`, `password`, `access_key` , `status` FROM `administrator_user` WHERE user_role != ? " , ["admin"])
       return result;
      } catch (error) {
        return error
    }
  }

  static colCount (userId){
    try {
      const result = db.execute('SELECT COUNT(reachedCheckout) FROM user_log WHERE userId=?' , [userId])
      return result
    } catch (error) {
      return error
    }
  }

  static countOne (userId){
    try {
      const result = db.execute('SELECT COUNT(reachedCheckout) FROM user_log WHERE userId=? AND reachedCheckout=?' , [userId,1])
      return result
    } catch (error) {
      return error
    }
  }
  static countZero (userId){
    try {
      const result = db.execute('SELECT COUNT(reachedCheckout) FROM user_log WHERE userId=? AND reachedCheckout=?' , [userId,0])
      return result
    } catch (error) {
      return error
    }
  }

}