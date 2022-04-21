const UserModel = require('../model/user');


const bcrypt = require('bcryptjs');
// const addUser = (req, res) => {
//   const {first_name,last_name,email,password} = req.body;
//   const hashPass = encrypt(password);
//   console.log(hashPass.encryptedData);
//   const user = new UserModel(first_name,last_name,email,password);
//   console.log(user);
//   user.save();
// }
const addUserByPhone = async (req,res)=>{
  console.log("adding user by phone number");
 const {fname,lname,phone, password} = req.body;

  console.log(phone + " " + password)
  console.log(fname + " " + lname)
  const hashPassword = await bcrypt.hash(password , 8 );

  console.log(hashPassword);

  const date = new Date();  

  const [user , metaData]= await UserModel.fetchPhone(phone);
  console.log(user.length);

  if(user.length === 0){    
   const user = new UserModel(fname,lname,null,phone,hashPassword , date);
    console.log(user);
   user.save();
  }
  else{    
    console.log("Phone already in use");
    res.send("Error while signup");
  }
}

const getAllUser = async(req,res)=>{
  console.log('getting all the users now');

  const [users, metaData]= await UserModel.fetchAllUsers()
  res.send(users);

}

const getUser = async(req,res) => {
  console.log('in appi get user');
  const email = req.body.email;
  const password = req.body.password;
  console.log(password);
  const hashPass = encrypt(password);
  console.log(hashPass);
  const [user, metaData] = await UserModel.fetchAll(email, password)  
  console.log('before user');
  console.log(user);
  if(user?.length){
    console.log("found user");
    res.send(user);
  }else{
    console.log('no luck');
    res.sendStatus(401);
  }
}



module.exports = {
	getUser,
	// addUser,
  addUserByPhone,
  getAllUser
};
