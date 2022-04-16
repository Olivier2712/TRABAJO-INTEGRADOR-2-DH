var express = require('express');
var router = express.Router();
var productController = require("../controladores/productController.js")

/* GET home page. */
router.get('/productos', productController.index);
router.get('/add', productController.add);
router.get('/resultados-de-busqueda', productController.resultadosBusqueda);

module.exports = router;
