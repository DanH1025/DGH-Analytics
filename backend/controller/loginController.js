const UserModel = require('../model/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');



// const verify = (req,res, next)=>{
//     const authHeader = req.headers.authorization;

//     if(authHeader){
//         const token =authHeader.split(" ")[1];

//         jwt.verify(token, process.env.TOKEN_KEY , (err, user)=>{
//             if(err){
//                 return res.status(403).json("Token not valid")
//             }
//             req.user = user;
//             next()
//         });
//     }else{
//         res.status(401).json("You are not authenticated")
//     }
// }



const loginWithPhone = async(req,res)=>{
    console.log("in Loginwith phone number");  
    
    const {phone , password} = req.body;

   
   

    console.log("this is from the login controller" + phone + " " + password);

    const [data , metaData] = await UserModel.fetchPhone(phone);
    console.log("this is the user with that phone numeber")
    console.log(data)   

    const hashPass = await bcrypt.hash(password, 8);
    console.log(hashPass);

   
    const isCorrect = await bcrypt.compare(password , data[0].password );
    console.log(isCorrect)

    if(isCorrect){
        console.log("Login Successfull")
        console.log(phone);


        //generate user ID
        // const userId =  await bcrypt.hash(phone,3) + Math.random()
        // console.log(userId); 

        
        //generating web token 

       const userAccessToken = jwt.sign({id: data[0].id}, process.env.TOKEN_KEY);

        res.send({
            userName: data[0].fname + "_" + data[0].lname,
            phoneNumber: data[0].phone_number,
            userAccessToken
        })
      // res.send(data[0])

       // res.send("this is what the data should be")
       
    }else{ 
        console.log("Login failed")
        res.send("Phone number or password was incorrect")
    }
}




module.exports = {
    loginWithPhone,
    // verify
};