const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public/imgs/products'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  })

  const upload = multer({ storage: storage })


const productsController = require('../controllers/productsController')

/* GET Shop page. */


router.get('/', productsController.index); // Listado de Productos
router.get('/create', productsController.create); // Formulario de creacion de productos
router.get('/:id', productsController.detail); // Detalle de un producto particular
router.post('/', upload.array('productImages', 6), productsController.store); // Accion de creacion (a donde se envia el formulario)
router.get('/:id/edit', productsController.edit); // Formulario de edicion de productos
router.put('/:id', productsController.edit); // Accion de edicion (a donde se envia el formulario)
router.delete('/:id', productsController.delete); // Accion de borrado
router.get('/wishlist', productsController.wishlist); // Quizas deba ser con un filter, no haga falta armar otro view.ejs



module.exports = router;
