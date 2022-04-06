const ProductModel = require('../model/product');
// const async = require('hbs/lib/async');

const addProduct = (req, res) => {
  const {productName,productPrice,productBrand,productCategory,productDetail,productImg} = req.body;

  const prod = new ProductModel(productName,productPrice,productBrand,productCategory,productDetail,productImg);

  prod.save();
}

const getProducts = async(req,res) => {
  console.log('in appi get product');
  const [product, metaData] = await ProductModel.fetchActive();
  // console.log(product);
  res.send(product);
}

const getAllProducts = async(req,res) => {
  console.log('in appi get product');
  const [product, metaData] = await ProductModel.fetchAll();
  // console.log(product);
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

const deleteProduct = async(req,res)=>{
  console.log("im deleting a product with id: " + req.body.id);
  const id= req.body.id;
  const [ product, metaData] = await ProductModel.deleteProductById(id)
    
}

const editProductValues = async(req,res)=>{
  console.log("im editing products right now");
  const {id,name,price,brand,category,detail,image,count_in_stock,status} = req.body;

  await ProductModel.updateProduct(id,name,price,brand,category,detail,image,count_in_stock,status);



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


const recordSearchHistory = async(req,res)=>{
  console.log("recording search history");
  const {name , category} = req.body;
  if(category === ''){
    const [product, metaData] = await ProductModel.recordSearch(name,"All");
  }else{
    const [product, metaData] = await ProductModel.recordSearch(name,category);

  }

}


module.exports = {
	getProducts,
  getAllProducts,
	addProduct,
  
  
  getProductsByCatagory,
  getProductsById,
  getProductsBySearch,


  deleteProduct,
  editProductValues,


  recordSearchHistory

};