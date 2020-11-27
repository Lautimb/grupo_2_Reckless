const dataBaseHelper = require('../helpers/data-base-helper');
const productsController ={
    index: (req,res) =>{
        const allProducts = dataBaseHelper.getAllDataBase('products-data.json');
        res.render('products', { products : allProducts});
    },
    create: (req, res) => {
        res.render('products/create');
    },
    store: (req, res) => {
        const images = req.files;
        for(let i = 0; i< images.length; i++){
            images[i] = images[i].originalname;
        }
        
        const newProduct = {
            id: dataBaseHelper.generateId('products-data.json'),
            images: images,
            name: req.body.name,
            description: req.body.productDescription,
            size: req.body.size,
            type: req.body.type
        }
        
        const allProducts = dataBaseHelper.getAllDataBase('products-data.json');
        const productsToSave = [...allProducts, newProduct];
        dataBaseHelper.writeNewDataBase(productsToSave,'products-data.json');

        res.redirect('/products');
    },
    detail: (req,res) =>{
        /*
        1. Leer Base de datos completa y buscar el producto entero del id requerido.
        2. Captar el producto y asignarlo a una variable que debe ser un objeto literal con propiedades y valores.
        3. Mandar el producto a la vista.
        */
        const id = req.params.id;
        const products = dataBaseHelper.getAllDataBase('products-data.json');
        const result = products.find((product) => {
            return product.id == id
        })

        res.render('products/detail', { product: result });
        
    },
    edit: (req,res) =>{
        // Renderizar vista de creacion con los campos value del product:id que se quiera editar.
        res.render('products/create');
    },
    wishlist: (req,res) =>{
        res.render('products/wishlist');
    },
    delete: (req, res) =>{
        res.render('products/detail');
    }
    

}


module.exports = productsController;