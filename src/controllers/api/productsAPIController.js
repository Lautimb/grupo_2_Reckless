const { Product } = require('../../database/models');
const { Type } = require('../../database/models')


module.exports = {
    async list (req, res) {
        try{
            // PAGINATION
            const page = Number(req.query.page) || 1
            
            const paginatedProducts = await Product.findAndCountAll({
                include: [{
                    all: true,
                    nested: true
                }],
                order: ["id"],
                limit: 4,
                offset: 4 * (page - 1),
            })
            const totalPages = Math.ceil(paginatedProducts.count / 4)
            
            // SETTING IMGS
            paginatedProducts.rows.forEach( product => {
               
                product.dataValues.detail = `http://localhost:3300/api/products/${product.id}`                    
                const images = JSON.parse(product.images[0].filename)
                product.dataValues.images_url = images.map(image => image = `http://localhost:3300/imgs/products/${image}`)
                product.dataValues.images = undefined 
            })
            paginatedProducts.page = page

            // ALL PRODUCTS NO LIMIT
            const allProducts = await Product.findAll({include:{all:true,nested:true}})

            // LAST PRODUCT
            const lastProduct = allProducts[allProducts.length - 1]
            lastProduct.dataValues.images_url = `http://localhost:3300/imgs/products/${JSON.parse(lastProduct.images[0].filename)}`
            lastProduct.dataValues.detail = `http://localhost:3300/products/detail/${lastProduct.id}` 

            // TOTAL AMOUNT IN DATA BASE
            const prices = await allProducts.map( product => parseInt(product.price))
            const totalAmount = prices.reduce((totalAmount, price) => totalAmount + price );
            
            // COUNT BY CATEGORIES

            const types = await Type.findAll({
                include:[{
                    all: true,
                    nested: true
                }]
            })

            const type = types.map(cat =>{
                const eachType = []
                eachType.push(cat.title)
                eachType.push(cat.products.length)
                return eachType
            })

            const typeObject = Object.fromEntries(type);

            res.json({
                meta: {
                    status: 'success',
                    count: allProducts.length,
                    countByCategory: typeObject,
                    totalAmount,
                    totalCategories : types.length,
                    lastProduct,
                    totalPages,

                    previousPage: page > 1 ? `http://localhost:3300/api/products?page=${page - 1}` : null,
                    currentPage: `http://localhost:3300/api/products?page=${page}`,
                    nextPage:  page < totalPages ? `http://localhost:3300/api/products?page=${page + 1}` : null
                },
                paginatedProducts
                
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
            product.dataValues.images_url = images.map( image => `http://localhost:3300/imgs/products/${image}`)
            product.dataValues.images = undefined 

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
