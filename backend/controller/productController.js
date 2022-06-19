// const async = require('hbs/lib/async');
const ProductModel = require('../model/product');
// const async = require('hbs/lib/async');

const addProduct = (req, res) => {
  const {productName,productPrice,productBrand,productCategory,productDetail,productImg, amount, productCostPrice} = req.body;

  const prod = new ProductModel(productName,productPrice,productBrand,productCategory,productDetail,productImg, amount, productCostPrice);

  try{
    prod.save();
  } catch(e) {
    console.log(e);
  }  
}   

const commentHandler = async(req, res)=>{ 
  console.log("inside comment handelr");
  const {message, productId, userId, productName} = req.body;

  const date = new Date(); 

  const [data, metaData] = await ProductModel.productReview(userId,productId,productName,message,date);

  res.json({
    message,
    productId,
    userId,
    productName, 
    date
  })

   
}
  
const getComments = async(req,res)=>{

  const {id} = req.body;
  console.log("product id is " + id);

  const [data, metaData] = await ProductModel.fetchComment(id);
  console.log(data);
  res.send(data.splice(0,3));


}

const getProducts = async(req,res) => {
  console.log('in appi get product');
  const [product, metaData] = await ProductModel.fetchActive();
  // console.log(product);
  res.send(product);
}

const getActiveProducts = async(req,res)=>{
  console.log("getting active products");


  const {sq} = req.query;
  console.log(sq);


  const [product, metaData]= await ProductModel.fetchActive();
  res.json(product) 
}

const getDiactiveProducts = async (req,res)=>{
  console.log("getting diactivated products");

  const {sq} = req.query;
  console.log(sq);

  const [product , metaData] = await ProductModel.fetchDiactive();



  res.json(product) 
}



const getAllProducts = async(req,res) => {
  console.log('in appi get product');
  const [product, metaData] = await ProductModel.fetchAll();
  console.log(product);


  // const keys = ["productName", "productBrand", "productCategory","productPrice"];

  // const search  = (data) =>{
  //   return data.filter((product)=>{
  //     //keys.some((key)=> product[key].toLowerCase().includes(sq));
  //     keys.some((key)=>{
  //       product[key].includes(sq)
  //     })
  //   })
  // }

  
  const {sq} = req.query;
  console.log(sq);
  res.json(product.filter(pro=> pro.productName.toLowerCase().includes(sq.toLowerCase())).splice(0,9)) 

 // res.send(product.filter(product=> product.productName.toLowerCase().includes(sq)).splice(0,10));
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
  
  if(name === ''){ 
    console.log("i know txt is empty")
    if(category === ''){
      console.log("i know both the txt and category are empty")
       const [product , metaData] = await ProductModel.fetchRand();
       res.send(product.splice(0,7))
    }
    else{    
      console.log("i know txt is empty byt category is not")
      console.log('in search with  catagory');
      const [product, metaData] =await ProductModel.fetchByCategory(category);
      console.log(product)
        res.send(product);  
    }   
                    

         
  
  }else{
    if(category === ''){   
      console.log("i know name is not empty but cat egory is")
      const [product , metaData] = await ProductModel.fetchAll()

      console.log(name); 
      console.log(product) 
      res.send(product.filter(pro=> pro.productName.toLowerCase().includes(name)))
    }else{
      console.log("i know both are not empty")
      console.log("this is what im searching for" + name + " " + category)
      const [product, metaData] =  await ProductModel.findByNameCategory(name, category);
      console.log(product)
      res.send(product);
      
    }  
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
const recordAddToCartHistory = async(req,res)=>{
  console.log("recording whats added on the cart");
  const {id, quantity, userId} = req.body;
  
  await ProductModel.recordAddToCart(id, quantity, userId);
}

const changeVisits = async(req, res) => {
  const id = req.body.id;
  console.log('product id: ' + id);
  await ProductModel.addVisits(id);
  res.sendStatus(200);
}
const getTopFive = async(req,res)=>{
    const [data, metaData] = await ProductModel.fetchTopFive();

    res.json(data.splice(0,5))
}
const sellProduct = async(req,res)=>{
    const {id , qty} = req.body;

    if(id === '' || qty === ''){
      res.status(401).json({
        message: "Server Error",
        status: 1
      })
    }else{
       const [product, metaData]= await ProductModel.findById(id)
       //res.status(200).json({product})
        console.log(product)
        if(product.length === 1){
           console.log("i got the product , decreasing the product quantity now")
           if(product[0].countInStock >= qty  ){
             const newStock = product[0].countInStock - qty
             const [stock , stockInfo] = await ProductModel.reduceStock(id , newStock)
             res.status(200).json({
                message: "Count in stock has been reduced",
                status: 0
             })

           }else{
            res.status(300).json({
              message: "Invalid Input",
              status: 3  
            })
           }
        }else {
          res.status(401).json({
            message: "Server Error",
            status: 2
          })
        }
     }

  
}
const returnProduct = async (req , res)=>{
  const {id , qty} = req.body;

  if(id === '' || qty === ''){
    res.status(401).json({
      message: "Server Error",
      status: 1
    })
  }else{
     const [product, metaData]= await ProductModel.findById(id)
     //res.status(200).json({product})
      console.log(product) 
      if(product.length === 1){
         console.log("i got the product , increasing the product quantity now")       
           const newStock = (product[0].countInStock + qty)
            await ProductModel.returnToStock(id , newStock) 
           res.status(200).json({
              message: "Item has been returned to stock successfully",
              status: 0
           })

      }else {
        res.status(401).json({
          message: "Server Error",   
          status: 2 
        })
      }
   }
}

module.exports = {
	getProducts,
  getAllProducts, 
  getActiveProducts,
  getDiactiveProducts,
	addProduct,
  getTopFive,
  sellProduct,
  returnProduct,
  
  
  getProductsByCatagory,
  getProductsById,
  getProductsBySearch,

  deleteProduct,
  editProductValues,


  recordSearchHistory,
  recordAddToCartHistory,
  changeVisits,

  commentHandler,
  getComments

};