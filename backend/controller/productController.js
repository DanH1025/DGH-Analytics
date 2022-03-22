const ProductModel = require('../model/product');
// const async = require('hbs/lib/async');

const addProduct = (req, res) => {
  const {productName,productPrice,productBrand,productCategory,productDetail,productImg} = req.body;

  const prod = new ProductModel(productName,productPrice,productBrand,productCategory,productDetail,productImg);

  prod.save();
  // const sqlInsert = 
  // "INSERT INTO product (product_name,product_detail,product_price,product_category,product_brand,product_img) VALUES (?,?,?,?,?,?)"
  // db.query(sqlInsert, [productName,productDetail,productPrice,productCategory,productBrand,productImg,] , (error,results)=>{
      
  // })
}

const getProducts = async(req,res) => {
  console.log('in appi get product');
  const [product, metaData] = await ProductModel.fetchAll();
  console.log(product);
  // const sqlGet= "SELECT * FROM product";
  // db.query(sqlGet, (error,resutls)=>{
      res.send(product);
  // })
}

module.exports = {
	getProducts,
	addProduct,
};