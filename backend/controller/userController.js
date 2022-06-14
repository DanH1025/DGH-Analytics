const UserModel = require('../model/user');

const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
let refreshTokens = []; 

       
const changeAdminUserName = async (req,res)=>{
    const {email,userName} = req.body;

    const [user, metaUser] = await UserModel.fetchAdminUser(email);

    if(user.length === 0){
      res.json({
        status: "404",
        message: 'User Not Found' 
      }) 
    }else{   
        console.log("changin the admin name ")
        UserModel.changeAdminName(userName , email);
        res.json({
          status:"200",
          message:"UserName change successful"
        })     
    }

}

const changeAdminPassword = async (req,res)=>{
  const {email , oldPassword , newPassword} = req.body;

  const [user , userData] = await UserModel.fetchAdminUser(email);
  if(user.length === 0){
    res.json({
      status: "404",
      message: "user Not found"
    })
  }else{ 
     if( await bcrypt.compare(oldPassword , user[0].password)){
       const hashPass = await bcrypt.hash(newPassword , 8)
       const [data, metaData] = await UserModel.adminPasswordChange(email, hashPass);

      res.json({
        status: '200',
        message:'admin password change successful'
      })


     }else{
       res.json({
        status: '402',
        message: "Invalid old password"
       })
     }
  }


}

const getAdminUserName = async(req,res)=>{
  const {email} = req.body;

  const [data , metaData] = await UserModel.fetchAdminUser(email)

  if(data.length === 0){
    res.json({
      status: "404",
      message: "user Not found"
    })
  }else{
    res.json(data[0])

  }
}

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

const addUserByEmail = async (req, res) => {
  const {fname,lname,email,password} = req.body;

  const status = 'active';
  
  const hashPass = await bcrypt.hash(password , 8 );
  // console.log(hashPass.encryptedData);

  const date = new Date();  
  
  try{    
    const user = new UserModel(fname,lname,email,null,hashPass, date , status);
    console.log(user);
    user.save();
    res.send(user);
  }catch(e){    
    console.log("Phone already in use");
    res.send("Error while signup");
  }
  
}

const addUserByPhone = async (req,res)=>{
  console.log("adding user by phone number");
 const {fname,lname,phone, password} = req.body;
 const status = 'active';

  console.log(phone + " " + password)
  console.log(fname + " " + lname)
  const hashPassword = await bcrypt.hash(password , 8 );

  console.log(hashPassword);

  const date = new Date();  

  const [user , metaData]= await UserModel.fetchPhone(phone);
  console.log(user.length);

  if(user.length === 0){    
   const user = new UserModel(fname,lname,null,phone,hashPassword , date , status);
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

const checkUser = async(req,res) => {
  console.log('in appi get user');
  const phone = req.body.phone;

  const [user, metaData] = await UserModel.checkUser(phone)
  console.log(user[0]['EXISTS(SELECT * from user WHERE phone_number=?)']);
  if(user[0]['EXISTS(SELECT * from user WHERE phone_number=?)']){
    console.log("found user");
    res.send(true);
  }else{
    console.log('no luck');
    res.send(false);
  }
}

const checkEmail = async(req,res) => {
  console.log('in appi get user');
  const email = req.body.email;

  const [user, metaData] = await UserModel.checkEmail(email)
  console.log(user[0]['EXISTS(SELECT * from user WHERE email=?)']);
  if(user[0]['EXISTS(SELECT * from user WHERE email=?)']){
    console.log("found user");
    res.send(true);
  }else{
    console.log('no luck');
    res.send(false);
  }
}
      
const getAdminUser = async (req,res)=>{
  // res.send("getting all the admin users")

  const{email, password} = req.body;

  console.log("from admin login controller " +email + password);

  // const hashPass = await bcrypt.hash(password,8);
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
      // res.send({
      //   header: "Error",
      //   message: "User Not Found",
      //   status: 1
      // })
      console.log("Login failed")
          res.status(401).send("password error")
    }
  }catch(error){
    // console.log(error);
    // res.send({
    //   header: "Error",
    //   message: "User Not Found",
    //   status: 1
    // })
    console.log("Login failed")
      res.status(400).send("Error")
  }

} 

const createAdminAccount = async (req,res)=>{
  console.log("the dispatch is working , im here")
  const {name, email , password} = req.body;
  const date = new Date();
  const user_role = 'admin'
  const access_key = 'master'

  const hashPass = await bcrypt.hash(password , 8);

  const [user, metaUser] = await UserModel.fetchAdminUser(email);

  if(user.length === 0){
    if(name === '' || email === '' || password === '' || hashPass ===''){
      res.json({
        status: 401,
        message: "Error while creating account"
      })
    }else{
      const [data , metaData] = await UserModel.addAdministratorAccount(name , email, user_role , access_key, hashPass, date);
      res.json({
        status: 200,
        message: "Account created successfully"
      })
    }
  

  }else{
    res.json({
      status: 400,
      message: "Email already in use"
    })
  }

  
  


  console.log(name  ,email , password);
}





module.exports = {
	getUser,
  addUserByEmail,
  addUserByPhone,
  getAllUser,
  checkUser,
  checkEmail,
  getAdminUser,
  verifyAdmin,
  getAdminUserName,
  changeAdminUserName,
  changeAdminPassword,
  createAdminAccount
  
};
