
const dataBaseHelper = require('../helpers/data-base-helper')
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
            id: dataBaseHelper.generateId('products-data.json'),
            images: images,
            name: req.body.name,
            description: req.body.productDescription,
            size: req.body.size,
            type: req.body.type
        }
        
        const allProducts = dataBaseHelper.getAllDataBase('products-data.json');
        const productsToSave = [...allProducts, newProduct];
        dataBaseHelper.writeNewDataBase(productsToSave,'products-data.json');

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