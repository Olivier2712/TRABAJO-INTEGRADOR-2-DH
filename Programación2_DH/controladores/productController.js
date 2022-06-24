// const productos = require("../data/productos");
// const usuarios = require("../data/usuario");
const db = require('../database/models');
let {Op} = require('sequelize');
const Usuario = require('../database/models/Usuario');
const { request } = require('express');

const productController = {
    index: function(req,res){res.render('product',{productos: productos, usuario: usuarios, logueado: true})},

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
                    {descripcion: {[Op.like]: `%${producto_buscado}%`}},
                    {modelo: {[Op.like]: `%${producto_buscado}%`}}
            ]}
        })
        .then(function(productos) {
            const auth = req.session.auth;
            if (productos && productos.length > 0) {
               console.log(productos[0].Usuario)
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

    add: function(req,res) {
        auth = req.session.auth
        if(auth){
            res.render('product-add',{auth})
        }else{
            res.redirect("/")
        }
        
    },

    store:  function(req,res) {

        const nuevoProducto = {
            modelo: req.body.modelo,
            descripcion: req.body.descripcion,
            user_id: req.session.auth,
            imagen_url: req.file.filename,
            update_at: new Date(),
            create_at: new Date()
        }
           
        db.Producto.findOne ({where:{modelo:nuevoProducto.modelo}}) 
            .then (function (productoencontrado){
                if (productoencontrado){
                    // crear logica de error producto existente 
                    req.send("producto existente")
                } else {
                    db.Producto.create(nuevoProducto) 
                        .then(function(resultado){
                            console.log("producto creado")
                            res.redirect("/")
                        })
                }
            })
    },
}
   
    module.exports = productController;