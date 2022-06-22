// const productos = require("../data/productos.js")
const db = require('../database/models/index');

const mainController = {
  index: function (req, res) {
    let auth = null;
    if (req.session.auth) {
      auth = req.session.auth;
    } else if (req.cookies.cookieAuth) {
      auth = req.cookies.cookieAuth
    }

    db.Producto.findAll({
      include: [
        { association: "comentario_producto", include: "usuario_comentario" },
        { association: "usuario_producto" }
      ],
      order: [["createdAt", "DESC"]]
    })
      .then(function (productos) {
        // res.render('index', {
        //   productos: productos,
        //   cantidad_comentarios: productos.comentario_producto,
        //   auth
        // })
        res.send(productos)
      })
      .catch(function (error) { console.log(error) })
  },
}



module.exports = mainController;