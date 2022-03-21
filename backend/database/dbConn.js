const mysql =  require('mysql');
const dotenv = require('dotenv');


dotenv.config({path:'../../.env'});

exports.DBcon = ()=>{
    try{
        const db = mysql.createConnection({
            host:process.env.DATABASE_HOST,
            user:process.env.DATABASE_USER ,
            password:process.env.DATABASE_PASSWORD,
            database:process.env.DATABASE
        });
        console.log("DATABASE connected successfully")

    }catch(error){
        console.log("Error while connecting to database");
    }
}





