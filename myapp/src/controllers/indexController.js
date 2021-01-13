const db = require('../database/models')
module.exports = {
    index: async (req,res) =>{
        const products = await db.Product.findAll({
            include: ["images"]
        });

        products.forEach(product => {
            product.images[0].filename = JSON.parse(product.images[0].filename)
            return 
        });
        
       
        res.render('index', { products });
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

