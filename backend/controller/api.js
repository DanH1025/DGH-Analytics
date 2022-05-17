// const async = require('hbs/lib/async');
const UserModel = require('../model/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
let refreshTokens = []; 

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, "mySecretKey", {
    expiresIn: "300s",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, "myRefreshSecretKey");
};

// api's
const users = async(req, res) => {
  const {phone , password} = req.body;
  // console.log(user);

  

  try{
      const [data , metaData] = await UserModel.fetchPhone(phone);
      console.log(data)   

      const hashPass = await bcrypt.hash(password, 8);
      console.log(hashPass);
      const isCorrect = await bcrypt.compare(password , data[0].password);
      console.log(isCorrect)
      const da = data[0];
      if(isCorrect){
        const accessToken = generateAccessToken(da);
        const refreshToken = generateRefreshToken(da);
        refreshTokens.push(refreshToken);
        
        // res.header("Access-Control-Allow-Headers","*");
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        // res.header('Access-Control-Allow-Credentials', true);

        res.cookie('jwt', accessToken , { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        // res.cookie('fname', da.fname , { httpOnly: false, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        // res.cookie('phone', da.phone_number , { httpOnly: false, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

        // console.log('jwt: ' + req.cookie['jwt']);
        
        const respon = [{
            'id': da.id,
            'fname' : da.fname,
            'lname' : da.lname,
            'phoneNo' : da.phone_number,
            'accessToken' : accessToken,
            'refreshToken' : refreshToken,
          }]


        res.status(200).send(
          // username: user.userFirstName,
          // email: user.email,
          // da, 
          // accessToken,
          // refreshToken,
          respon
          // 'true'
        );
        console.log("Login Successfull")
        console.log('cook;:' + req.cookies['jwt']);

      }else{ 
          console.log("Login failed")
          res.status(401).send("Errorss")
      }
  }catch(error){
      console.log("Login failed")
      res.status(401).send("Error")
  }
}

const verify = (req, res, next) => {
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

const deleteP = (req, res) => {
  console.log(req.params.userId);
  console.log('can buy');
  res.status(200).json("can delete");
};

module.exports = {
  users,
  deleteP,
  verify,
};