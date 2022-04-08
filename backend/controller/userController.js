const UserModel = require('../model/user');


const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const addUser = (req, res) => {
  const {first_name,last_name,email,password} = req.body;
  const hashPass = encrypt(password);
  console.log(hashPass.encryptedData);
  const user = new UserModel(first_name,last_name,email,password);
  console.log(user);
  user.save();
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

function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  // return encrypted.toString('hex');
 }

 function decrypt(text) {
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}


module.exports = {
	getUser,
	addUser,
};