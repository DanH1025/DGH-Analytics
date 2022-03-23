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
  // console.log(product);
    res.send(product);
}

const getProductsById = async(req,res) => {
  console.log('in get product by id');
  const id= req.body.id;
  console.log('cat: ' + id);
  console.log('in appi get product id');
  const [product, metaData] = await ProductModel.findById(id);
  // console.log(product);
    res.send(product);
}

const getProductsBySearch = async(req,res) => {
  console.log('in get product by search');
  const name= req.body.name;
  const category= req.body.category;
  console.log('cat: ' + name);
  console.log('in appi get product id');
  if(category === ''){
    console.log('in search no catagory');
    const [product, metaData] = await ProductModel.findByName(name);
    console.log(product);
    res.send(product);
  } else {
    console.log('in search with  catagory');
    const [product, metaData] = await ProductModel.findByNameCategory(name, category);
    console.log(product);
      res.send(product);
  }
}


module.exports = {
	getProducts,
	addProduct,
  
  
  getProductsByCatagory,
  getProductsById,
  getProductsBySearch,
};