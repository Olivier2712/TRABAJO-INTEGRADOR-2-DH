const productos = require("../data/productos");
const usuarios = require("../data/usuario");
const db = require('../database/models');

const productController = {
    index: function(req,res){res.render('product',{producto: productos, usuario: usuarios, logueado: true})},
    add: function(req,res){res.render('product-add', {usuario: usuarios, logueado: true})},
    resultadosBusqueda: function(req,res){res.render('search-results', {producto: productos})}
}
   
    module.exports = productController;