var express = require('express');
const multer = require('multer');
const path = require("path");
var router = express.Router();
var productController = require("../controladores/productController.js")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'./../public/images/products'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })
/* GET home page. */
router.get('/productos', productController.index);
router.get('/add', productController.add);
router.get('/resultados-de-busqueda', productController.resultadosBusqueda);
router.get('/detalle/:id', productController.detalle);
router.post('/store', upload.single("imagen_url"), productController.store);

module.exports = router;
