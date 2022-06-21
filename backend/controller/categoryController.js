
const ProductModel = require('../model/product');
const CategoryModel = require('../model/category');

const addCategory = (req, res) => {
    const {categoryName, categoryValue, categoryImg} = req.body;
  
    const category = new CategoryModel(categoryName, categoryValue, categoryImg);
  
    try{
      category.save();
      res.sendStatus(200);
    } catch(e) {
      console.log(e);
    }  
  }   

const getAllCategories = async (req,res)=>{
    console.log("getting all the categories for you");
    const [category, metaData] = await CategoryModel.fetchAllCategory();

    // console.log(category),
    res.send(category);
}

module.exports ={   
    getAllCategories,
    addCategory
}