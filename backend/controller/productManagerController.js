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

    const {email, AK, role} = req.body;
    console.log("saving my access key" + email + " " + AK);
    
    const date = new Date()

    const [savedAccessKey, metaData] = await UserModel.addAccessKey(email , date, role, AK);

    
    res.json(savedAccessKey)
}


const getNewProductManager = async (req,res)=>{
    const [newProductManager , metaData] = await UserModel.fetchNewPM()

    console.log("inside getting new product manager controller")

    res.send(newProductManager)

}

const activatePM = async (req,res)=>{
    console.log("inside activation");

    const {email} = req.body
    const activation = "Active";

    const [user, metaD] = await UserModel.fetchAdminUser(email);



    console.log(user);

    if(user[0].status === activation){
        res.json({
            data: "User is Already Active",
            isSuccess: false,
        })
    }else{
        const [data,metaData] = await UserModel.activatePM(email,activation);
    
        res.json({
            data: data,
            isSuccess: true
        })
    }
   
}
const diactivatePM = async(req,res)=>{
    console.log('inside diactivation');

    const {email} = req.body;
    const diactivation = "Diactive";

    const [user,metaD] = await UserModel.fetchAdminUser(email)

    if(user[0].status === diactivation){
        res.json({
            data:"User is already diactive",
            isSuccess: false
        })
    }else{
        const [data, metaData] = await UserModel.activatePM(email,diactivation);
        res.json({
            data:data,
            isSuccess: true
        })
    }

}




module.exports = {
    getNewProductManager,
    accessKeyGenerator,
    saveAccessKey,
    activatePM ,
    diactivatePM 
};