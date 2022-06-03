const mysql =  require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const DBcon = mysql.createPool({

    host: 'localhost',
    user: 'root' ,
    password:'',
    database: 'dgh-analytics'


    // host:process.env.DATABASE_HOST,
    // user:process.env.DATABASE_USER ,
    // password:process.env.DATABASE_PASSWORD,
    // database:process.env.DATABASE

});

module.exports = DBcon.promise();