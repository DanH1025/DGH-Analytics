const db = require('../database/dbConn')

module.exports = class Request {
  constructor(fname,lname,email,phone, password, date){
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.phone =phone;
    this.password = password;
    this.date = date;
    
  }

  save() {
    
    try{
      db.execute('INSERT INTO user (fname,lname,email,phone_number,password,signUpDate) VALUES (?,?,?,?,?,?)', 
      [  
        this.fname,
        this.lname,
        this.email,
        this.phone, 
        this.password,
        this.date,
      ])

    }catch(e){
      console.log("user save error: " + e);
    }
  }
 

  static fetchPhone(phone){
    try {
      const result = db.execute('SELECT * FROM user WHERE phone_number=?', [phone]);
      return result
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
       const result =db.execute('SELECT * FROM users WHERE userEmail=? AND password=?', [email, password]);
       return result;
    }catch(err){
      console.log(err);
    }
  }
}