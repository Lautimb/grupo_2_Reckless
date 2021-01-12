const express = require('express');
const router = express.Router();

const indexController = require('../controllers/indexController');

/* GET home page. */

router.get('/', indexController.index);
router.get('/contact', indexController.contact);
router.get('/lookbook', indexController.lookbook);
router.get('/social', indexController.social);


module.exports = router;
