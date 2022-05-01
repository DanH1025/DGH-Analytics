require('dotenv').config()
const bodyParser= require('body-parser'); 
const express = require('express');
const cors = require('cors'); 
const mysql = require('mysql');
const Product = require('../backend/model/product');
const db = require('./database/dbConn');  
const routes = require('./routes/routes');
const authRoutes = require('./routes/auth')
const cookieSession = require("cookie-session"); 
const passport =require('passport');
const passportSetup = require('./passport')

var schedule = require('node-schedule');  
const {addOrderReport} = require('./controller/orderReportController');

 
const app = express();
app.use(express.json()); // allows to recieve data with json format from our request variables at the frontend
app.use(bodyParser.urlencoded({extended: true})); 

// app.use(cors({
  
//   origin: "https://localhost:3000/",
//   methods: "GET,POST,PUT,DELETE",
//   credentials: true
// }));

app.use(cors());

app.use(cookieSession({
    name: "session",
    keys: ["cookies"],
    maxAge: 24*60*60*100,
}))
app.use(passport.initialize());
app.use(passport.session());

 
app.use('/api', routes);
app.use('/auth' , authRoutes);

schedule.scheduleJob('0 44 23 * * * ', function(){
  console.log('The answer to life, the universe, and everything!');
  addOrderReport();
});

app.use('/analysis', addOrderReport);
 
//to deploy the project on heroku
if(process.env.NODE_ENV === "production"){
  app.use(express.static('frontend/build'));

  app.get('*' , (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'frontend' ,'build' , 'index.html'))
  })

}



const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>console.log(`server running on port ${PORT}`))