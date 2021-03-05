const { Product } = require('../../database/models');
const { Type } = require('../../database/models')


module.exports = {
    async list (req, res) {
        try{
            const page = Number(req.query.page) || 1
            const allProducts = await Product.findAndCountAll({
                include: [{
                    all: true,
                    nested: true
                }
                ],
                order: ["id"],
                limit: 4,
                offset: 4 * (page - 1),
            })

            const totalPages = Math.ceil(allProducts.count / 4)
            

            allProducts.rows.forEach( product => {
                product.dataValues.detail = `http://localhost:3300/api/products/${product.id}`                    
                // product.setDataValues('detail',`http://localhost:3300/api/products/${product.id}`)

                const images = JSON.parse(product.images[0].filename)
                product.dataValues.images_url = images.map((image,i) => image = `http://localhost:3300/imgs/products/${images[i]}`)
                product.dataValues.images = undefined //Quitando data que parece sobrar
            })

            const lastProduct = allProducts.rows[allProducts.rows.length - 1];

            const prices = allProducts.rows.map( product => parseInt(product.price))
            const totalAmount = prices.reduce((totalAmount, price) => totalAmount + price );
            

            const types = await Type.findAll({
                include:[{
                    all: true,
                    nested: true
                }]
            })

            const type = types.map(cat =>{
                const title = cat.title
                const titleQty = cat.products.length
                return title + ': ' + titleQty
            })
            
           

            // const top = allProducts.rows.filter( product => {
            //     return product.types[0].title == "Top"
            // })

            
            // const bottom = allProducts.rows.filter( product => {
            //     return product.types[0].title == "Bottom"
            // })
           

            // const outerwear = allProducts.rows.filter( product => {
            //     return product.types[0].title == "Outerwear"
            // })

            // const denim = allProducts.rows.filter( product => {
            //     return product.types[0].title == "Denim"
            // })


            res.json({
                meta: {
                    status: 'success',
                    count: allProducts.length,
                    countByCategory: {
                        type
                    },
                    totalAmount,
                    totalCategories : types.length,
                    lastProduct,
                    totalPages,
                    previousPage: page > 1 ?`http://localhost:3300/api/products/${page - 1}` : null,
                    currentPage: `http://localhost:3300/api/products/${page}`,
                    nextPage:  page < totalPages ? `http://localhost:3300/api/products/${page + 1}` : null
                },
                allProducts
               
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
            product.dataValues.images_url = images.map((image,i) => image = `http://localhost:3300/imgs/products/${images[i]}`)
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
