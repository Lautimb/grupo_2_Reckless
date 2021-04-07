const { validationResult } = require('express-validator');
const db = require('../database/models');
const parser = require('../helpers/parser')
module.exports = {
    index: async (req,res) =>{
        const products = await db.Product.findAll({
            include: ["images"]
        });
        products.forEach( product => {
            product.images[0].filename = JSON.parse(product.images[0].filename)
            return 
        });
        res.render('products/index', { products });
    },
    filter: async (req,res)=>{
        const products = await db.Product.findAll({
            include:["images","types"]
        })
        // recibo por parametro el tipo de producto a mostrar, dato obtenido del submenu del shop en la lista del header
        const type = req.params.type
        // filtro el producto a mostrar
        products.forEach( product => {
            product.images[0].filename = JSON.parse(product.images[0].filename)
            return 
        });

        const productsToShow = products.filter( product => product.types[0].title.toLowerCase() == type)

       
        // le agrego una propiedad al objeto creado con los productos a mostrar, y guardo en él, el tipo de producto en mayúsculas para poner de titulo en la seccion.
        
        // mando la respuesta con los productos a mostrar
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

        const { qty, color , size , name, description, price , wholesaleprice , discount , art} = req.body

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
            discount,
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
        const types = (typeof req.body.type == "string" ? [req.body.type] : req.body.type)
        await product.addTypes(parseInt(types),product.id)

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

        const product = await db.Product.findByPk(id,{
            include:["images","sizes", "types"]
        })
       
        product.images[0].filename = JSON.parse(product.images[0].filename)

        res.render('products/edit', { product, sizes, types });

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
        
        const { name, description, price , wholesaleprice, discount , art } = req.body;
    
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
            include:["images","sizes", "types"]
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

        const sizes = (typeof req.body.size == "string" ? [req.body.size] : req.body.size)

        await product.setSizes(parseInt(sizes),product.id)

        const types = (typeof req.body.type == "string" ? [req.body.type] : req.body.type)

        await product.setTypes(parseInt(types),product.id)

        return res.redirect('/'); 
    },

    wishlist: (req,res) =>{
        res.render('products/wishlist');
    },

    delete: async (req, res) => {
        
        const product = await db.Product.findByPk(req.params.id); 

        await product.setImages([]);

        await product.setSizes([]);

        await product.setTypes([]);

        await product.setColors([]);

        await product.setStocks([])

        await product.setUsers([])
        
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


