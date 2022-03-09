require('dotenv').config()
const bodyParser= require('body-parser'); 
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');


    const db = mysql.createConnection({
        host:process.env.DATABASE_HOST,
        user:process.env.DATABASE_USER ,
        password:process.env.DATABASE_PASSWORD,
        database:process.env.DATABASE
    });
    console.log("DATABASE connected successfully")


const app = express();
app.use(express.json()); // allows to recieve data with json format from our request variables at the frontend
app.use(bodyParser.urlencoded({extended: true})); 
app.use(cors()); 


app.get('/' , (req,res)=>{
    res.send("this is the home url /");
})


app.post('/api/addToStock' , (req, res)=>{
    const {productName,productPrice,productBrand,productCategory,productDetail,productImg} = req.body;

    const sqlInsert = 
    "INSERT INTO product (product_name,product_detail,product_price,product_category,product_brand,product_img) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [productName,productDetail,productPrice,productCategory,productBrand,productImg,] , (error,results)=>{
        
    })
})

app.get('/api/getAllProducts', (req,res)=>{
    const sqlGet= "SELECT * FROM product";
    db.query(sqlGet, (error,resutls)=>{
        res.send(resutls);
    })
})


const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>console.log(`server running on port ${PORT}`))