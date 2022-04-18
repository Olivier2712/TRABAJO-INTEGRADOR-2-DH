const productos = require("../data/productos.js")


const mainController = {
  index: function(req, res, next) {
    res.render('index', {
      producto: productos,
      logueado: false
    })
  },}

  
  
  module.exports = mainController;