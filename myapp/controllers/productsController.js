const productsController ={
    index: (req,res) =>{
        res.render('products');
    },
    detail: (req,res) =>{
        res.render('products/detail');
    },
    wishlist: (req,res) =>{
        res.render('products/wishlist');
    }

}


module.exports = productsController;