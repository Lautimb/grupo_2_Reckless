const { validationResult } = require('express-validator');
const db = require('../database/models');

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
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            wholesale_price: req.body.wholesaleprice,
            discount: req.body.discount,
            art: req.body.art
        })
        
        const files = req.files;
        const imagesMapped = files.map( image => image.filename );
        const imageStrings = JSON.stringify(imagesMapped)

        const images = await db.Image.create({
            filename: imageStrings
        })

        await product.setImages(images.id, product.id)

        // Sizes
        const sizes = (typeof req.body.size == "string" ? [req.body.size] : req.body.size)
        
        const eachSize = sizes.map(sizeID=> parseInt(sizeID)) // falta agregar logica para que se guarde 1 sola vez la relacion talle-producto

        await product.addSizes(eachSize, product.id)

        // Types
        const types = (typeof req.body.type == "string" ? [req.body.type] : req.body.type)
        
        await product.addTypes(parseInt(types),product.id)

        //Colors
        const colors = (typeof req.body.color == "string" ? [req.body.color] : req.body.color)

        const eachColor = colors.map(colorID=> parseInt(colorID)) // falta agregar logica para que se guarde 1 sola vez la relacion color-producto

        await product.addColors(eachColor, product.id)

        //const stocks = (typeof req.body.qty == "number" ? [req.body.qty] : req.body.qty)

        //await product.setQty(parseInt(stocks), product.id)
       
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


