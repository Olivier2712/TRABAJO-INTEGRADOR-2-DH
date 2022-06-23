// const productos = require("../data/productos");
// const usuarios = require("../data/usuario");
const db = require('../database/models');
let {Op} = require('sequelize');

const productController = {
    index: function(req,res){res.render('product',{productos: productos, usuario: usuarios, logueado: true})},
    add: function(req,res){res.render('product-add', {usuario: usuarios, logueado: true})},
    resultadosBusqueda: function(req,res){res.render('search-results', {producto: productos})},

    resultadosBusqueda: function(req,res) {

        let producto_buscado = req.query.search

        db.Producto.findAll({
            include: [
                { association: "comentario_producto", include: "usuario_comentario" },
                {association: "usuario_producto"}
            ],
            where: {
                [Op.or]:[
                    {"descripcion": {[Op.like]: `%${producto_buscado}%`}},
                    {"modelo": {[Op.like]: `%${producto_buscado}%`}}
            ]}
        })
        .then(function(productos) {
            const auth = req.session.auth;
            if (productos && productos.length > 0) {
               
                res.render('search-results', {
                    productos: productos,
                    cantidad_comentarios: productos.comentario_producto,
                    auth
                })
            } else {
                res.render('search-results-not-found',{auth})
            }
        })
        .catch(function(error) {
            console.log(error);
        })

    },

    detalle:  function(req,res) {
        const id= req.params.id;
        const auth = req.session.auth;
        
        const producto = db.Producto.findByPk(id)
       .then(function (producto) {
        if (producto) {
            console.log(producto);
            res.render('product', {producto, auth});
        } else { 
            res.render('search-results-not-found',{auth})
        }
       })
       .catch(function(error){
        res.send(error);
       })},
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