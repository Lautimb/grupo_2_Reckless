const productsHelper = require('../helpers/products-helper');
const productsController ={
    index: (req,res) =>{
        res.render('products');
    },
    create: (req, res) => {
        res.render('products/upload');
    },
    store: (req, res) => {
        const images = req.files;
        for(let i = 0; i< images.length; i++){
            images[i] = images[i].originalname;
        }
        
        const newProduct = {
            id: productsHelper.generateId(),
            images: images,
            name: req.body.name,
            description: req.body.productDescription,
            size: req.body.size,
            type: req.body.type
        }
        const allProducts = productsHelper.getAllProducts();
        const productsToSave = [...allProducts, newProduct];
        productsHelper.writeProductsData(productsToSave);

        res.redirect('/products/create');
    },
    detail: (req,res) =>{
        res.render('products/detail');
    },
    wishlist: (req,res) =>{
        res.render('products/wishlist');
    },
    upload: (req, res) =>{
        res.render('products/upload');
    }
    

}


module.exports = productsController;