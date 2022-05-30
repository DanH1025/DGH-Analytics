const UserModel = require('../model/user')

 

const calcCheckoutRate = async(req,res)=>{
    const {userId} = req.body; 

    //get the count for 1 
    const [countOne , metaOne] = await UserModel.countOne(userId);
    const one = countOne[0]["COUNT(reachedCheckout)"];

    //get the count for 0
    const [countZero, metaZero] = await UserModel.countZero(userId);
    const zero = countZero[0]["COUNT(reachedCheckout)"];
   

    res.status(200).json({
        zero,
        one
    }); 

}



module.exports = {
	calcCheckoutRate,

};