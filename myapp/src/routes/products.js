const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const multerProducts = require('../middlewares/multer/products')
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const validator = require('../middlewares/validator')

/* GET Shop page. */

router.get('/', productsController.index); // Listado de Productos
router.get('/category/:type', productsController.filter) // Ruta creada para filtrar productos a traves del menu de shop
router.get('/create',admin, productsController.create); // Formulario de creacion de productos
router.post('/create', multerProducts.array('images', 6), validator.products, productsController.store); // Accion de creacion (a donde se envia el formulario)

router.get('/detail/:id', productsController.detail); // Detalle de un producto particular


router.get('/edit/:id',admin, productsController.edit); // Formulario de edicion de productos
router.put('/edit/:id', multerProducts.array('images', 6), validator.products , productsController.editStore); // Accion de edicion (a donde se envia la informacion solicitada en el formulario)


router.delete('/delete/:id',admin, productsController.delete); // Accion de borrado
router.get('/wishlist',auth, productsController.wishlist); // Quizas deba ser con un filter, no haga falta armar otro view.ejs



module.exports = router;
