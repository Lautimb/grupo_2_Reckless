const dataBaseHelper = require('../helpers/data-base-helper');
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
    filter:(req,res)=>{
        const allProducts = dataBaseHelper.getAllDataBase('products-data.json');
        // recibo por parametro el tipo de producto a mostrar, dato obtenido del submenu del shop en la lista del header
        const type = req.params.type
        // filtro el producto a mostrar
		const productsToShow = allProducts.filter((product) => {
            return product.type == type
        })
        // le agrego una propiedad al objeto creado con los productos a mostrar, y guardo en él, el tipo de producto en mayúsculas para poner de titulo en la seccion.
        productsToShow.type = type.toUpperCase();
        // mando la respuesta con los productos a mostrar
		res.render('products/products-type', {
			products: productsToShow
		});

    },
    create: (req, res) => {
        res.render('products/create');
    },
    store: async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){

            return res.render('products/create', {
                errors: errors.mapped(),
                old: req.body
            })
        }

        const files = req.files;
        const imagesMapped = files.map( image => image.filename );
        const imageStrings = JSON.stringify(imagesMapped)
        
        const images = await db.Image.create({
            filename: imageStrings
            }
        )
       
        const product = await db.Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            wholesale_price: req.body.wholesaleprice,
            discount: req.body.discount,
            art: req.body.art            
        })

        await product.setImages(images.id, product.id)
        
        const sizes = (typeof req.body.size == "string" ? [req.body.size] : req.body.size)
        
        await product.setSizes(parseInt(sizes),product.id) 
        
        res.redirect('/products');
    },
    detail: async (req,res) =>{
       
        const id = req.params.id;
        const product = await db.Product.findByPk(id,{
            include:["images","sizes"]
        });
      
        product.images[0].filename = JSON.parse(product.images[0].filename)
        
        res.render('products/detail', { product });
        
    },
    edit: async(req,res) =>{
        
        const id = req.params.id;
        
        const product = await db.Product.findByPk(id,{
            include:["images","sizes"]
        })

    
        const images = JSON.parse(product.images[0].filename)
       
        
        res.render('products/edit', { product, images });

    },
    update: async(req,res)=>{
        
        // const errors = validationResult(req);
        // if(!errors.isEmpty()){
        //     return res.render('products/edit', {
        //         errors: errors.mapped(),
        //         old: req.body,
        //         id
        //     })
        // }
        
        // allProducts.map( product => {
		// 	if (product.id == id){
        //         product.images = images == false ? product.images : images,
        //         product.name = req.body.name,
        //         product.description = req.body.description,
        //         product.price = req.body.price, 
        //         product.discount = req.body.discount,
        //         product.type = req.body.type
		// 	}
		// 	return product;
		// })
        // dataBaseHelper.writeNewDataBase(allProducts,'products-data.json');

        // const id = req.params.id;
        // const product = await db.Product.findByPk(id,{
        //     include: ["images","sizes"]
        // });

        
        // LOGRAMOS EDITAR TODOS LOS CAMPOS QUE NOS LLEGAN A TRAVES DEL BODY, PERO NO LLEGAMOS A EDITAR LAS IMAGENES QUE NOS LLEGAN POR 
        // EL REQ.FILES, O LA QUE DEBERIA PERMANECER DE LA DB


        const { name, description, price , wholesale_price, discount , art } = req.body;
    
        await db.Product.update(
        {
            name,
            price,
            description,
            wholesale_price,
            discount,
            art
        },
        {
            where: {
                id: req.params.id
            }
        }
        );


        return res.redirect('/');
    },

    wishlist: (req,res) =>{
        res.render('products/wishlist');
    },

    delete: async (req, res) => {
        
        const product = await db.Product.findByPk(req.params.id); 

        await product.setImages([]);

        await product.setSizes([])
        
        await db.Product.destroy({
          where: {
            id: req.params.id
          }
        });
    
        return res.redirect("/");
      }
    

}


