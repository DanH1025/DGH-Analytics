const UserModel = require('../model/user');

const bcrypt = require('bcryptjs');

const loginWithPhone = async(req,res)=>{
    console.log("in Loginwith phone number");  
    
    const {phone , password} = req.body;
    try{   
        const [data , metaData] = await UserModel.fetchPhone(phone);
        console.log(data)   

        const hashPass = await bcrypt.hash(password, 8);
        console.log(hashPass);
        const isCorrect = await bcrypt.compare(password , data[0].password );
        console.log(isCorrect)

        if(isCorrect){
            console.log("Login Successfull")
            console.log(phone);
            const resp = [];
            resp.push(data[0]);
            res.send(resp);

           // res.send("this is what the data should be")
     
        }else{ 
            console.log("Login failed")
            res.status(401).send("Error")
        }
    }catch(error){
        console.log("Login failed")
        res.status(401).send("Error")
    }
}


module.exports = {
    loginWithPhone,
};