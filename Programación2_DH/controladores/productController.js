// const productos = require("../data/productos");
// const usuarios = require("../data/usuario");
const db = require('../database/models');
let op = db.Sequelize.Op

const productController = {
    index: function(req,res){res.render('product',{producto: productos, usuario: usuarios, logueado: true})},
    add: function(req,res){res.render('product-add', {usuario: usuarios, logueado: true})},
    resultadosBusqueda: function(req,res){res.render('search-results', {producto: productos})},

    //AGREGAR PRODUCTO

    productos: function(req,res) {
        res.render('product/add')
    },

    newProduct:  function(req,res) {

        const nuevoProducto = {
            modelo: req.body.modelo,
            descripcion: req.body.descripcion,
            imagen_url: req.body.imagen_url,
            update_at: new Date(),
            create_at: new Date()
        }
           
         db.Producto.findByPk({where:[{email: req.body.email}]}) 
         .then(function(buscarProducto){
                
                if (buscarProducto == null) {
                     db.Producto.update(nuevoProducto);
                    res.redirect('/products/productos');    
                 } else  {
                     res.send("El producto ya existe.")
                }

            })
            .catch(function (error){
                res.send("Ha ocurrido un error de conexión.")
            });
       
    },
}
   
    module.exports = productController;