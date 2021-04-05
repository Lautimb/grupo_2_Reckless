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

        const total = items.reduce((acum, curr) =>{
            return acum += parseInt(curr.item_subtotal)
        }, 0)
        
       
        res.render("cart", {items, total})
    },

    async addToCart (req, res) {
        const product = await Product.findByPk(req.params.id,{
            include:[{
                all: true,
                nested: true
            }]
        })

        await Item.create({
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
    async shop (req, res){
        //traer items para calcular el total
        const items = await Item.findAll({
            where: {
                user_id: req.session.user.id,
                order_id: null
            }
        })
        // calculo total para enviar a la orden
        const totalAmount = items.reduce((acum, curr) =>{
            return acum += parseInt(curr.item_subtotal)
        }, 0)

        //calculo total de items
        const totalQty = items.reduce((acum, curr) =>{
            return acum += parseInt(curr.qty)
        }, 0)

        // creamos la orden
        const order = await Order.create({
            total_qty: totalQty,
            user_id: req.session.user.id,
            total: totalAmount

        })
        // actualizamos items
        await Item.update({
            order_id: order.id
        }, {
           where: {
               user_id: req.session.user.id,
               order_id: null
           } 
        })

        return res.redirect("/cart")

    },

    checkout: (req,res)=>{

        res.send("/checkout")
    }   
    
}

module.exports = cartController;