const { validationResult } = require('express-validator');
const db = require('../database/models');
const parser = require('../helpers/parser')
module.exports = {
    index: async (req,res) =>{
        const products = await db.Product.findAll({
            include: ["images","users"],
            order:[["created_at", "ASC"]]
        });
        if(req.session.user){
            products.forEach(product => {    
                product.users.forEach( user => {
                    if(req.session.user.id == user.wishlists.user_id){
                        product.setDataValue('liked', 'added') 
                    }
                })            
            });
        }
        products.forEach( product => {
            product.images[0].filename = JSON.parse(product.images[0].filename)
            product.setDataValue('users', '')
            return 
        });
        res.render('products/index', { products });
    },
    filter: async (req,res)=>{
        const products = await db.Product.findAll({
            include:["images","types","users"]
        })
        const { type } = req.params
        products.forEach( product => {
            product.images[0].filename = JSON.parse(product.images[0].filename)
            return 
        });

        const productsToShow = products.filter( product => product.types[0].title.toLowerCase() == type)

        if(req.session.user){
            products.forEach(product => {    
                product.users.forEach( user => {
                    if(req.session.user.id == user.wishlists.user_id){
                        product.setDataValue('liked', 'added') 
                    }
                })            
            });
        }
       
		res.render('products/products-type', {
            products : productsToShow,
            type
		});

    },
    create: async (req, res) => {

        const sizes = await db.Size.findAll()
        const types = await db.Type.findAll()
        const colors = await db.Color.findAll()
        
        res.render('products/create',{
            old: req.body,
            sizes,
            types,
            colors
        });
    },

    store: async(req, res)=>{
        const errors = validationResult(req);

        const { qty, color , size , name, description, price , wholesaleprice , discount , art, type} = req.body

        if(!errors.isEmpty()){ 
            const sizes = await db.Size.findAll()
            const types = await db.Type.findAll() 
            return res.render('products/create', {
                errors: errors.mapped(),
                old: req.body,
                sizes,
                types
            })
        }
       
        const product = await db.Product.create({
            name,
            description,
            price,
            wholesale_price: wholesaleprice,
            discount: discount == '' ? 0 : discount ,
            art
        })
        
        // Images

        const files = req.files;
        const imagesMapped = files.map( image => image.filename );
        const imageStrings = JSON.stringify(imagesMapped)

        const images = await db.Image.create({
            filename: imageStrings
        })
        await product.setImages(images.id, product.id)

        // Sizes
        const eachSize = parser(size)
        await product.addSizes(eachSize, product.id)

        // Types
        const eachType = parser(type)
        await product.addTypes(eachType, product.id)

        //Colors
        const eachColor = parser(color)
        await product.addColors(eachColor, product.id)

        // Qty
        const eachQty= parser(qty)

        await eachQty.forEach((qty, i ) =>{
            db.Stock.create({
                qty: qty,
                product_id: product.id,
                color_id: eachColor[i],
                size_id: eachSize[i]
            })
        })
        
        res.redirect('/products');
    },
    detail: async (req,res) =>{
       
        const id = req.params.id;
        const product = await db.Product.findByPk(id,{
            include:["images","sizes", "colors"]
        });
      
        product.images[0].filename = JSON.parse(product.images[0].filename)
        
        res.render('products/detail', { product });
    },
    edit: async(req,res) =>{
        
        const id = req.params.id;
        // Traigo la lista de talles y categorias para mandar a los select del form
        const sizes = await db.Size.findAll()
        const types = await db.Type.findAll()
        const colors = await db.Color.findAll()

        const product = await db.Product.findByPk(id,{
            include:["images","sizes", "types", "colors", "stocks"]
        })
       
        product.images[0].filename = JSON.parse(product.images[0].filename)
        
        product.stocks.forEach( (stock)=> {
            
            const productSizesTitle = sizes.find ( size => stock.size_id == size.id)
            stock.setDataValue( "sizeTitle", productSizesTitle.title)

            const productColorsTitle = colors.find ( color => stock.color_id == color.id)
            stock.setDataValue( "colorTitle", productColorsTitle.title)
        })

        res.render('products/edit', { product, sizes, types, colors });

    },
    update: async(req,res)=>{
        
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            const sizes = await db.Size.findAll()
            const types = await db.Type.findAll()
            
            return res.render('products/edit', {
                errors: errors.mapped(),
                old: req.body,
                sizes,
                types
            })
        }
        
        const { name, description, price, wholesaleprice, discount, art, qty, color, size, type } = req.body;
    
        await db.Product.update(
        {
            name,
            price,
            description,
            wholesale_price: wholesaleprice,
            discount,
            art
        },
        {
            where: {
                id: req.params.id
            }
        }
        );

        const product = await db.Product.findByPk(req.params.id,{
            include:["images","sizes", "types", "colors"]
        });
        

        if (req.files.length > 0) {
            const files = req.files;
            const imagesMapped = files.map( image => image.filename );
            const imageStrings = JSON.stringify(imagesMapped)
            const images = await db.Image.create({
                filename: imageStrings
            })
            await product.setImages(images);
        }

        // Sizes
        const eachSize = parser(size)
        await product.setSizes(eachSize, product.id)

        // Types
        const eachType = parser(type)
        await product.setTypes(eachType, product.id)

        //Colors
        const eachColor = parser(color)
        await product.setColors(eachColor, product.id)

        //Qty
        const eachQty= parser(qty)

        const stocks = await db.Stock.findAll({
            where: {
                product_id: product.id
            }
        })

        stocks.forEach( async (stock, i ) =>{
            await db.Stock.update({
                qty: eachQty[i],
                color_id: eachColor[i],
                size_id: eachSize[i]
            },{
                where:{ 
                    id: stock.id,   
                    product_id: stock.product_id,
                    color_id: stock.color_id,
                    size_id: stock.size_id
                }
            })
        })

        return res.redirect('/'); 
    },

    wishlist: async (req,res) =>{

        const products = await db.Product.findAll({
            include: ["images","users"],
            order:[["created_at", "ASC"]],
        });
        const productsWished = []

        products.forEach(product => {    
            product.images[0].filename = JSON.parse(product.images[0].filename)
            product.users.forEach( user => {
                if(req.session.user.id == user.wishlists.user_id){
                    product.setDataValue('liked', 'added') 
                    productsWished.push(product)
                }
            })            
        });
        
        res.render('products/wishlist',{
            productsWished
        });
    },

    delete: async (req, res) => {
        
        const product = await db.Product.findByPk(req.params.id); 

        const stock = await db.Stock.findOne({
            where: {
                product_id: req.params.id
            }
        })

        await product.setTypes([]);

        await product.setColors([]);
        
        await product.setImages([]);

        await product.setSizes([]);
        
        await product.setUsers([])

        await db.Item.update({
            stock_id: null
        },{
            where: {
                stock_id: stock.id
            }
        })
        
        await db.Stock.destroy({
            where:{
                product_id: req.params.id
            }
        })

        await db.Product.destroy({
          where: {
            id: req.params.id
          }
        });

    
        return res.redirect("/");
    },

    colors: async (req, res) => {
        const colors = await db.Color.findAll()

        res.render ('products/colors',{ colors });
    },

    newColor: async (req, res) => {
        res.render ('products/newColor')
    },

    saveNewColor: async (req, res) => {

        const color = await db.Color.create({
            title: req.body.title,
            hexadecimal: req.body.hexadecimal
        })

        res.redirect('/products/create/colors')
    },

    sizes: async (req, res) => {

        const sizes = await db.Size.findAll()

        res.render ('products/sizes', { sizes })
    },

    newSize: async (req, res) => {
        res.render ('products/newSize')
    },

    saveNewSize: async (req, res) => {
        const size = await db.Size.create({
            title: req.body.title
        })

        res.redirect('/products/create/sizes')
    },
    

}


