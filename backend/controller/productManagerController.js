const UserModel = require('../model/user');
const bcrypt = require('bcryptjs')



const accessKeyGenerator = async (req,res)=>{
    console.log("generating access key  here");
    const {email} = req.body

    const [user, metaData] = await UserModel.fetchAdminUser(email);


    if(user.length > 0){
        res.json({
            isUser: true
        });
    }else{
        const access_key = parseInt(Math.random() * (999999 - 000001) + 000001);
        console.log(access_key);            
        res.json({
            isUser: false,
            access_key: access_key
        }); 
    }
}

const saveAccessKey = async(req,res)=>{

    const {email, AK} = req.body;
    console.log("saving my access key" + email + " " + AK);
    
    const date = new Date()

    const [savedAccessKey, metaData] = await UserModel.addAccessKey(email , date , AK);

    
    res.json(savedAccessKey)
}


const getNewProductManager = async (req,res)=>{
    const [newProductManager , metaData] = await UserModel.fetchNewPM()

    console.log("inside getting new product manager controller")

    res.send(newProductManager)

}




module.exports = {
    getNewProductManager,
    accessKeyGenerator,
    saveAccessKey
};