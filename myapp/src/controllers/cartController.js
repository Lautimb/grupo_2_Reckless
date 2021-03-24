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

        let item = await Item.create({
            name: product.name,
            img: product.images[0].filename,
            price: product.price,
            wholesale_price: product.wholesale_price,
            discount: product.discount,
            qty: req.body.qty,
            item_subtotal: (product.price - (product.discount * product.price / 100)) * req.body.qty,
            user_id: req.session.user.id 
        })

        res.send(item)
    },


    checkout: (req,res)=>{
        
            
        



        res.send("/checkout")
    }   
    
}

module.exports = cartController;