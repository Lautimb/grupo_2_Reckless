const dataBaseHelper = require('../helpers/data-base-helper');

module.exports = {
    index: (req,res) =>{
        const allProducts = dataBaseHelper.getAllDataBase('products-data.json');
        allProducts.forEach(product => {
            product.images = product.images[0]
           
        });
        res.render('index', { products : allProducts });
    },
    contact: (req,res) =>{
        res.render('contact');
    },
    lookbook: (req,res) =>{
        res.render('lookbook');
    },
    social: (req,res) =>{
        res.render('social');
    }    
}

