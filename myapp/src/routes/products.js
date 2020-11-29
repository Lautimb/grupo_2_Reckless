const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public/imgs/products'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
})
const upload = multer({ storage: storage })

const productsController = require('../controllers/productsController')

/* GET Shop page. */

router.get('/', productsController.index); // Listado de Productos
router.get('/create', productsController.create); // Formulario de creacion de productos
router.post('/create', upload.array('productImages', 6), productsController.store); // Accion de creacion (a donde se envia el formulario)

router.get('/detail/:id', productsController.detail); // Detalle de un producto particular

router.get('/edit/:id', productsController.edit); // Formulario de edicion de productos
router.put('/edit/:id', upload.array('productImages', 6), productsController.editStore); // Accion de edicion (a donde se envia la informacion solicitada en el formulario)


router.delete('/delete/:id', productsController.delete); // Accion de borrado
router.get('/wishlist', productsController.wishlist); // Quizas deba ser con un filter, no haga falta armar otro view.ejs



module.exports = router;
