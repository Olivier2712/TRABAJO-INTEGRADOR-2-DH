const productos = require("../data/productos.js")


const mainController = {
  index: function(req, res, next) {
    res.render('index')
    res.render('index', { productos: productos.lista})},
  }
  
  module.exports = mainController;