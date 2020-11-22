const productsController ={
    index: (req,res) =>{
        res.render('products');
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