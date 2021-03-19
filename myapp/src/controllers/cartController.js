const {Product, Item, User, Order, Image} = require('../database/models') 



const cartController = {
    cart: (req,res)=>{
        res.render('cart')
    },

    async addToCart (req, res) {
        const product = await Product.findByPk(req.params.id,{
            include:[{
                all: true,
                nested: true
            }]
        })

        const item = await Item.create({
            name: product.name,
            img: JSON.parse(product.images[0].filename),
            // price: ,
            // wholesale_price: ,
            // discount: ,
            // qty: ,
            // item_subtotal: ,

        })

        res.send()
    },


    checkout: (req,res)=>{
        res.render('checkout')
    }   
    
}

module.exports = cartController;