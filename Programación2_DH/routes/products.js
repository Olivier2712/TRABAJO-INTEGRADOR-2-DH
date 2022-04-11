var express = require('express');
var router = express.Router();
var productController = require("../controladores/productController.js")

/* GET home page. */
router.get('/product', productController.index);

module.exports = router;
