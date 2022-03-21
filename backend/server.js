require('dotenv').config()
const bodyParser= require('body-parser'); 
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const Product = require('../backend/model/product');
const db = require('./database/dbConn');
const routes = require('./routes/routes');

    // const db = mysql.createConnection({
    //     host:process.env.DATABASE_HOST,
    //     user:process.env.DATABASE_USER ,
    //     password:process.env.DATABASE_PASSWORD,
    //     database:process.env.DATABASE
    // });
    // console.log("DATABASE connected successfully")


const app = express();
app.use(express.json()); // allows to recieve data with json format from our request variables at the frontend
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors()); 

app.use('/api', routes);


const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>console.log(`server running on port ${PORT}`))