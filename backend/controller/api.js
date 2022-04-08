const async = require('hbs/lib/async');
const UserModel = require('../model/user');
const jwt = require("jsonwebtoken");

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
  const { email, password } = req.body;
  const [user, metaData] = await UserModel.fetchAll(email, password) 
  // console.log(user);
  if (user.length) {
    //Generate an access token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.send({
      // username: user.userFirstName,
      // email: user.email,
      user, 
      accessToken,
      refreshToken,
    });
  } else {
    res.status(400).json("Username or password incorrect!");
  }
};

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
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