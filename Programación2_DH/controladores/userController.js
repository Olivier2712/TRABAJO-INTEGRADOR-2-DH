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
           
        buscarEmail = await db.Usuario.findOne({where:[{email: req.body.email}]});

        if (buscarEmail == null) {
            await db.Usuario.create(nuevoUsuario);
            res.redirect('/users/login');    
        } else  {
            res.send("El email ingresado ya ha sido registrado, porfavor intenta con un nuevo email o ingresa a tu cuenta con el ingresado.")
        }
       
    },

    login: function(req,res) {
        res.render('login')
    },

    procesarLogin: async function(req,res) {
            const email = req.body.email;
            const password = req.body.password;
            const usuario = await db.Usuario.findOne({where:{email: email}});
           
            if (usuario) {
                if (bcrypt.compareSync(password, usuario.contrasenia)) {
                    const usuarioAuth = {id: usuario.id, email: usuario.email, nombre: usuario.nombre_de_usuario}
                    req.session.cookie.maxAge 
                    req.session.auth = usuarioAuth;
                    res.redirect('/');
                } else {
                    res.send("La contraseña ingreada es incorrecta.") 
                }
            }
   
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