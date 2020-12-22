const dataBaseHelper = require('../helpers/data-base-helper');
const { validationResult } = require('express-validator');

module.exports = {
    index: (req,res) =>{
        const allProducts = dataBaseHelper.getAllDataBase('products-data.json')
        // enviando a la vista la imagen principal solamente
        allProducts.forEach(product => {
            product.images = product.images[0];
            return;
        });
        
        res.render('products/index', { products: allProducts});
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
		res.render('products/products-category', {
			products: productsToShow
		});

    },
    create: (req, res) => {
        res.render('products/create');
    },
    store: (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){

            return res.render('products/create', {
                errors: errors.mapped(),
                old: req.body
            })
        }
        const files = req.files;
        const images = files.map( image => image.filename);
       
        const newProduct = {
            id: dataBaseHelper.generateId('products-data.json'),
            images: images,
            name: req.body.name.toUpperCase(),
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            type: req.body.type
        }
        
        const allProducts = dataBaseHelper.getAllDataBase('products-data.json');
        const productsToSave = [...allProducts, newProduct];
        dataBaseHelper.writeNewDataBase(productsToSave,'products-data.json');

        res.redirect('/products');
    },
    detail: (req,res) =>{
       
        const id = req.params.id;
        const products = dataBaseHelper.getAllDataBase('products-data.json');
        const result = products.find((product) => {
            return product.id == id;
        })
        res.render('products/detail', { product: result });
        
    },
    edit: (req,res) =>{
        
        const id = req.params.id;
        const products = dataBaseHelper.getAllDataBase('products-data.json');
        const result = products.find((product) => {
            return product.id == id;
        })  
        
        res.render('products/edit', { old : result});
    },
    editStore:(req,res)=>{
        const id = req.params.id;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('products/edit', {
                errors: errors.mapped(),
                old: req.body,
                id
            })
        }
        
        const files = req.files
        const images = files.map( image => image.filename)

        const allProducts = dataBaseHelper.getAllDataBase('products-data.json');
    
        allProducts.map( product => {
			if (product.id == id){
                product.images = images == false ? product.images : images,
                product.name = req.body.name,
                product.description = req.body.description,
                product.price = req.body.price,
                product.discount = req.body.discount,
                product.type = req.body.type
			}
			return product;
		})
        dataBaseHelper.writeNewDataBase(allProducts,'products-data.json');
        res.redirect('/');
    },

    wishlist: (req,res) =>{
        res.render('products/wishlist');
    },
    delete: (req, res) =>{

        const id = req.params.id;
        const allProducts = dataBaseHelper.getAllDataBase('products-data.json');
        const productDeleted = allProducts.filter((product)=>{
            return product.id != id;
        })
        dataBaseHelper.writeNewDataBase(productDeleted, 'products-data.json');
        res.redirect('/');
    }
    

}


