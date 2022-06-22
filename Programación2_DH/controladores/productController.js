// const productos = require("../data/productos");
// const usuarios = require("../data/usuario");
const db = require('../database/models');
let op = db.Sequelize.Op

const productController = {
    index: function(req,res){res.render('product',{producto: productos, usuario: usuarios, logueado: true})},
    add: function(req,res){res.render('product-add', {usuario: usuarios, logueado: true})},
    resultadosBusqueda: function(req,res){res.render('search-results', {producto: productos})},

    resultadosBusqueda: function(req,res) {

        let producto_buscado = req.query.search

        db.Producto.findAll({
            include: [
                { association: "comentario_producto", include: "usuario_comentario" },
                {association: "usuario_producto"}
            ],
            where: [
                {"modelo": {[op.like]: `%${producto_buscado}%`}},
                {"descripcion": {[op.like]: `%${producto_buscado}%`}}
            ]
        })
        .then(function(productos) {
            
            if (productos.length > 0) {
                res.render('search-results', {
                    producto: productos,
                    cantidad_comentarios: productos.comentario_producto.length
                })
            } else {
                res.send("No hay productos")
            }
        })
        .catch(function(error) {
            console.log(error);
        })

    },

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