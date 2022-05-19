const UserModel = require('../model/user');

const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
let refreshTokens = []; 

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, "mySecretKey", {
    expiresIn: "30s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, "myRefreshSecretKey");
};

const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  try{
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "mySecretKey", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.user = user;
      // console.log("go token");
      // res.status(200).json("You are authenticated!");
        next();
      });
    } else {
      console.log('not autori');
      res.status(401).json("You are not authenticated!");
    }
  }catch(err){
    console.log(err);
  }
};

const addUser = (req, res) => {
  const {first_name,last_name,email,password} = req.body;
  const hashPass = encrypt(password);
  console.log(hashPass.encryptedData);
  const user = new UserModel(first_name,last_name,email,password);
  console.log(user);
  user.save();
}

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
   res.send(user);
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
  const hashPass = await bcrypt.hash(password ,8);

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

const getAdminUser = async (req,res)=>{
  // res.send("getting all the admin users")

  const{email, password} = req.body;

  console.log(email + password);
  const hashPass = await bcrypt.hash(password,8);
  try{
    const [user, metaData] = await UserModel.fetchAdminUser(email);
  
    const isCorrect = await bcrypt.compare(password , user[0].password );
  
    console.log(user[0].password)
    const da = user[0];
    if(user.length >= 1){
      if(isCorrect){
        const accessToken = generateAccessToken(da);
        const refreshToken = generateRefreshToken(da);
        refreshTokens.push(refreshToken);
        
        res.send({data: user[0], accessToken: accessToken});
      }else{
        res.send({
          header: "Error",
          message:"Password Invalid",
          status: 1,
          
        })
      }
      
    }else{
      res.send({
        header: "Error",
        message: "User Not Found",
        status: 1
      })
    }
  }catch(error){
    console.log(error);
    res.send({
      header: "Error",
      message: "User Not Found",
      status: 1
    })
  }

}



module.exports = {
	getUser,
	addUser,
  addUserByPhone,
  getAllUser,
  getAdminUser,
  verifyAdmin
};
