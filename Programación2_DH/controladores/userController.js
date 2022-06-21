const productos = require("../data/productos")
const usuarios =require("../data/usuario") 
const db = require('../database/models/index');
const bcrypt = require('bcryptjs');

const userController = {
    
    registro: function(req,res) {
        res.render('register')
    },

    almacenarRegistro:  function(req,res) {

        const nuevoUsuario = {
            nombre_de_usuario: req.body.nombre,
            email: req.body.email,
            contrasenia: bcrypt.hashSync(req.body.password),
            fecha_de_nacimiento: req.body.fechaNacimiento,
            update_at: new Date(),
            create_at: new Date()
        }
           
         db.Usuario.findOne({where:[{email: req.body.email}]}) 
         .then(function(buscarEmail){
                
                if (buscarEmail == null) {
                     db.Usuario.create(nuevoUsuario);
                    res.redirect('/users/login');    
                 } else  {
                     res.send("El email ingresado ya ha sido registrado, porfavor intenta con un nuevo email o ingresa a tu cuenta con el ingresado.")
                }

            })
            .catch(function (error){
                res.send("Ha ocurrido un error de conexión.")
            });
       
    },

    login: function(req,res) {
        res.render('login')
    },

    procesarLogin:  function(req,res) {
            const email = req.body.email;
            const password = req.body.password;
            const recordame = req.body.recordame;
            
                db.Usuario.findOne({where:{email: email}})
                    .then(function (usuario){   
                            if (usuario) {
                                if (bcrypt.compareSync(password, usuario.contrasenia)) {
                                    const usuarioAuth = {id: usuario.id, email: usuario.email, nombre: usuario.nombre_de_usuario}
                                    req.session.cookie.maxAge 
                                    req.session.auth = usuarioAuth;

                                     if (recordame) {
                                        res.cookie("cookieAuth", usuarioAuth,{maxAge: 1000 * 60 * 5} );
                                    }
                                    res.redirect('/');
                                } else {
                                    res.send("La contraseña ingreada es incorrecta.") 
                                }
                            }
                    })
                    .catch(function (error){
                        console.log(error)
                        res.send("Ha ocurrido un error de conexión.")
                    });
                

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


    logout: function(req, res) {
        req.session.destroy()
        res.clearCookie("cookieAuth")
        res.redirect('/')
    }

}


    
    module.exports = userController;