const db = require('../database/dbConn')

module.exports = class Request {
  constructor(href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time,state, county, userId){
    this.href = href;
    this.referrer = referrer; 
    this.screenWidth = screenWidth; 
    this.screenHeight = screenHeight; 
    this.addToCart = addToCart; 
    this.reachedCheckout = reachedCheckout; 
    this.purchased = purchased; 
    this.date = date;
    this.time = time;
    this.state = state, 
    this.county = county,
    this.userId = userId; 
  }

  save() {
    console.log('in order log modle');
    // const date = new Date().toISOString().slice(0, 10);
    try{
      db.execute("INSERT INTO user_log (href, referrer, screenWidth, screenHeight, addToCart, reachedCheckout, purchased, date, time, city, state, userId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
      [ 
        this.href,
        this.referrer,
        this.screenWidth,
        this.screenHeight,
        this.addToCart,
        this.reachedCheckout,
        this.purchased,
        this.date,
        this.time,
        this.state, 
        this.county,
        this.userId
      ])
    }catch(e){
      console.log("order log save error: " + e);
    }
  }
 
  static fetchAll() {
    try{
       const result =db.execute('SELECT * FROM user_log');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchTotalUser() {
    try{
       const result =db.execute('SELECT COUNT(id) AS userNo FROM user_log');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static addToCartCount() {
    try{
       const result =db.execute('SELECT COUNT(addToCart) AS cartCount FROM `user_log` WHERE addToCart = true');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static reachCheckCount() {
    try{
       const result =db.execute('SELECT COUNT(reachedCheckout) AS checkoutCount FROM `user_log` WHERE reachedCheckout = true');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static purchaseCount() {
    try{
       const result =db.execute('SELECT COUNT(purchased) AS purchaseCount FROM `user_log` WHERE purchased = true;');
       return result;
    }catch(err){
      console.log(err);
    }
  }

  
  static addToCartCountByDate(date) {
    try{
       const result =db.execute('SELECT COUNT(addToCart) AS cartCount FROM `user_log` WHERE addToCart = true  AND date=?', [date]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static reachCheckCountByDate(date) {
    try{
       const result =db.execute('SELECT COUNT(reachedCheckout) AS checkoutCount FROM `user_log` WHERE reachedCheckout = true  AND date=?', [date]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static purchaseCountByDate(date) {
    try{
       const result =db.execute('SELECT COUNT(purchased) AS purchaseCount FROM `user_log` WHERE purchased = true AND date=?', [date]);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchTotalUserByDate(date) {
    try{
       const result =db.execute('SELECT COUNT(id) AS userToday FROM user_log WHERE date=?', [date]);
       return result;
    }catch(err){
      console.log(err);
    }
  }


  static fetchTotalUserByDateHour(date, hour) {
    try{
       const result =db.execute('SELECT COUNT(id) AS userHour FROM user_log WHERE date=? AND time LIKE ?', [date, hour + ':%']);
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchDeviceType() {
    try{
       const result =db.execute("select sum(case when screenWidth <= 414 then 1 else 0 end) as phone, sum(case when screenWidth > 601 and screenHeight < 962 and screenWidth <= 1280 and screenHeight>= 800 then 1 else 0 end) as tablet, sum(case when screenWidth > 1024 and screenHeight > 798 and screenWidth <= 1980 and screenHeight <= 1080 then 1 else 0 end) as desktop from user_log");
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchByLocation() {
    try{
       const result =db.execute("SELECT city, state, COUNT(state) AS session FROM user_log GROUP BY state ORDER BY COUNT(state) DESC LIMIT 5");
       return result;
    }catch(err){
      console.log(err);
    }
  }

  static fetchByUserHistory(date, day) {
    try{
       const result =db.execute("SELECT user_log.userId, user.fname, user.lname, user.signUpDate, COUNT(user_log.userId), COUNT(case user_log.purchased when 1 then 1 else null end) AS purchase FROM user_log INNER JOIN user ON user_log.userId = user.id WHERE date > DATE_SUB(?, INTERVAL ? DAY) AND userId != 0 GROUP BY userId ORDER BY COUNT(userId) DESC", [date, day]);
       return result;
    }catch(err){
      console.log(err);
    }
  }
}

// SELECT userId, COUNT(userId) FROM user_log WHERE date > DATE_SUB('2022-06-03', INTERVAL 10 DAY) GROUP BY userId


// SELECT * FROM user_log WHERE date > DATE_SUB('2022-06-03', INTERVAL 10 DAY) 

// top visitor in 100 day in asc
// SELECT userId, COUNT(userId) FROM user_log WHERE date > DATE_SUB('2022-06-03', INTERVAL 100 DAY) AND userId != 0 GROUP BY userId ORDER BY COUNT(userId) DESC

// SELECT userId, COUNT(userId), COUNT(case purchased when 1 then 1 else null end)  FROM user_log WHERE date > DATE_SUB('2022-06-03', INTERVAL 100 DAY) AND userId != 0 GROUP BY userId ORDER BY COUNT(userId) DESC

// final sql
// SELECT user_log.userId, user.fname, user.lname, user.signUpDate, COUNT(user_log.userId), COUNT(case user_log.purchased when 1 then 1 else null end) AS purchase FROM user_log INNER JOIN user ON user_log.userId = user.id WHERE date > DATE_SUB('2022-06-03', INTERVAL 100 DAY) AND userId != 0 GROUP BY userId ORDER BY COUNT(userId) DESC

// SELECT SUM(id),COUNT(date), date, SUM(total), SUM(average), SUM(orders), SUM(cost), SUM(no_item) ,SUM(session), SUM(addToCart), SUM(reachedCheckout), SUM(converted) FROM `orderreport` GROUP BY MONTH(date) ORDER BY date