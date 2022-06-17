const productos = require("../data/productos.js")
const db = require('../database/models');

const mainController = {
  index: function(req, res, next) {
db.Usuario.findAll()
.then(function(data){res.send(data)})
.catch(function(data){res.send(data)})
  },}

  
  
  module.exports = mainController;