const UserModel = require('../model/user');

const bcrypt = require('bcryptjs');

const loginWithPhone = async(req,res)=>{
    console.log("in Loginwith phone number");
    
    const {phone , password} = req.body;

    const [data , metaData] = await UserModel.fetchPhone(phone);
<<<<<<< HEAD
    console.log(data)   
=======
    console.log(data[0])   
>>>>>>> 9ee825e0a711f90182868b1579893903ed44a51a

    const hashPass = await bcrypt.hash(password, 8);
    console.log(hashPass);

   
    const isCorrect = await bcrypt.compare(password , data[0].password );
    console.log(isCorrect)

    if(isCorrect){
        console.log("Login Successfull")
<<<<<<< HEAD
        res.send(data[0])
       
    }else{ 
        console.log("Login failed")
        res.send("Error")
=======
        res.send(data);
    }else{
        console.log("Login failed")
        res.send('fakil')
>>>>>>> 9ee825e0a711f90182868b1579893903ed44a51a
    }
}




module.exports = {
    loginWithPhone,
};