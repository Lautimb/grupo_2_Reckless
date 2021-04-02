const {Product, Item, User, Order, Image} = require('../database/models') 



const cartController = {
    async cart (req,res) {
       const items = await Item.findAll({
            where: {
                user_id: req.session.user.id,
                order_id: null

            }
        })
        items.forEach( item => {
            item.img = JSON.parse(item.img)
            return 
        })
        
       
        res.render("cart", {items})
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

        res.redirect("/cart")
    },
    async delete (req, res) {
        
        const {id} = req.params

        await Item.destroy({
            where: {
                id: id
            }
        })

        return res.redirect("/cart")
    },

    checkout: (req,res)=>{
        
            
        



        res.send("/checkout")
    }   
    
}

module.exports = cartController;