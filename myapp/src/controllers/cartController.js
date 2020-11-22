const cartController = {
    cart: (req,res)=>{
        res.render('cart')
    },
    checkout: (req,res)=>{
        res.render('checkout')
    }   
    
}

module.exports = cartController;