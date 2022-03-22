const ProductModel = require('../model/product');
// const async = require('hbs/lib/async');

const addProduct = (req, res) => {
  const {productName,productPrice,productBrand,productCategory,productDetail,productImg} = req.body;

  const prod = new ProductModel(productName,productPrice,productBrand,productCategory,productDetail,productImg);

  prod.save();
}

const getProducts = async(req,res) => {
  console.log('in appi get product');
  const [product, metaData] = await ProductModel.fetchAll();
  console.log(product);
  res.send(product);
}
const getProductsByCatagory = async(req,res) => {
  console.log('in get product by catagory');
  console.log(req.body.category);
  const catagory= req.body.category;
  console.log('cat: ' + catagory);
  console.log('in appi get product catagory');
  const [product, metaData] = await ProductModel.fetchByCategory(catagory);
  console.log(product);
    res.send(product);
  
}






module.exports = {
	getProducts,
	addProduct,
  getProductsByCatagory,
};