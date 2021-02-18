const { Product } = require('../../database/models');



module.exports = {
    async list (req, res) {
        try{
            const products = await Product.findAll({
                include:["images"]
            })
            
            products.forEach( product => {
                product.dataValues.detail =  `http://localhost:3000/api/products/${product.id}`                                
            })
            
            res.json({
                meta: {
                    status: 'success',
                    count: products.length
                },
                data: {
                    products
                }
            })
        } catch (error) {
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Products not found',
            })
        }
    },

    async detail (req,res) {
        try{
            const product = await Product.findByPk(req.params.id,{
                include:["images","types","sizes","colors"]
            })
            
            const images = JSON.parse(product.images[0].filename)
            product.dataValues.images_url = images.map((image,i) => image = `http://localhost:3000/imgs/products/${images[i]}`)
            product.dataValues.images = undefined //Quitando data que parece sobrar

            res.json({
                meta: {
                    status: 'success',
                },
                data: {
                    product
                }
            })

        } catch (error){
            res.status(500).json({
                meta: {
                    status: 'error',
                },
                error: 'Product not found',
            })
        }
    }
};
