const productos = require("../data/productos.js")
const db = require('../database/models/index');

const mainController = {
  index: function(req, res) {
      let auth = null;
    if (req.session.auth) {
        auth= req.session.auth;
 } else if (req.cookies.cookieAuth){
        auth = req.cookies.cookieAuth  
 }
    res.render('index', {
      producto: productos,
      auth
    })
  },
}

  
  
  module.exports = mainController;