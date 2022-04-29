
const ProductModel = require('../model/product');

const getAllCategories = async (req,res)=>{
    console.log("getting all the categories for you");
    const [category, metaData] = await ProductModel.fetchAllCategory();

    console.log(category),
    res.send(category);
}

module.exports ={
    getAllCategories
}