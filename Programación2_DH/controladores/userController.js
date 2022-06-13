const productos = require("../data/productos")
const usuarios =require("../data/usuario") 
const db = require('../database/models');

const userController = {
    
    registro: function(req,res){res.render('register')},

    login: function(req,res){res.render('login')},

    profile: function(req,res){res.render('profile',{producto: productos, usuario: usuarios, logueado: true})},
    
     editProfile: function(req,res){
    res.render('profile-edit', { productos: productos.usuario, usuario: usuarios, logueado: true})
        
   
    },


}


    
    module.exports = userController;