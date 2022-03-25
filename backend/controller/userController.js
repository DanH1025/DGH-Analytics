const UserModel = require('../model/user');

const addUser = (req, res) => {
  const {first_name,last_name,email,password} = req.body;
  const user = new UserModel(first_name,last_name,email,password);
  console.log(user);
  user.save();
}

const getUser = async(req,res) => {
  console.log('in appi get user');
  const email = req.body.email;
  const password = req.body.password;

  const [user, metaData] = await UserModel.fetchAll(email, password)  
  console.log(user);
  res.send(user);
}

module.exports = {
	getUser,
	addUser,
};