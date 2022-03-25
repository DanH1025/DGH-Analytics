const db = require('../database/dbConn')

module.exports = class Request {
  constructor(first_name, last_name, email, password){
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }

  save() {
    const date = "11-23-5666";
    try{
      db.execute('INSERT INTO users (userFirstName, userLastName, userEmail, password, userRegistrationDate) VALUES (?,?,?,?,?)', 
      [ this.first_name, 
        this.last_name, 
        this.email, 
        this.password,
        date
      ])
    }catch(e){
      console.log("user save error: " + e);
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