const shopController ={
    index: (req,res) =>{
        res.render('shop');
    },
    productDetail: (req,res) =>{
        res.render('product-detail');
    },
    wishlist: (req,res) =>{
        res.render('wishlist');
    }

}


module.exports = shopController;