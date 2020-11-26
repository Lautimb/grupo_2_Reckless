const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join('public/imgs/products'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })

  const upload = multer({ storage: storage })


const productsController = require('../controllers/productsController')

/* GET Shop page. */


router.get('/', productsController.index);
router.get('/create', productsController.create);
router.post('/create', upload.array('productImages', 6), productsController.store);
router.get('/detail', productsController.detail);
router.get('/wishlist', productsController.wishlist);
router.get('/upload', productsController.upload);


module.exports = router;
