const productos = require("../data/productos.js")
const db = require('../database/models/index');

const mainController = {
  index: function(req, res, next) {
    res.render('index', {
      producto: productos,
      logueado: false
    })
  },
}

  
  
  module.exports = mainController;