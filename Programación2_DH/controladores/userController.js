const productos = require("../data/productos")
const usuarios =require("../data/usuario") 
const db = require('../database/models/index');
const bcrypt = require('bcryptjs');

const userController = {
    
    registro: function(req,res) {
        res.render('register')
    },

    almacenarRegistro: async function(req,res) {

        const nuevoUsuario = {
            nombre_de_usuario: req.body.nombre,
            email: req.body.email,
            contrasenia: bcrypt.hashSync(req.body.password),
            fecha_de_nacimiento: req.body.fechaNacimiento,
            update_at: new Date(),
            create_at: new Date()
        }

        await db.Usuario.create(nuevoUsuario);
        res.redirect('/users/login');
    },

    login: function(req,res) {
        res.render('login')
    },

    profile: function(req,res) {
        res.render(
            'profile',
            { producto: productos, usuario: usuarios, logueado: true}
        )
    },
    
    editProfile: function(req,res) {
        res.render(
            'profile-edit', 
            { productos: productos.usuario, usuario: usuarios, logueado: true}
        )
    },


}


    
    module.exports = userController;