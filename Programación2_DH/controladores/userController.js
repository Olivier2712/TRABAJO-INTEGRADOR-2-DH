const productos = require("../data/productos")
 
const userController = {
    
    registro: function(req,res){res.render('register')},

    login: function(req,res){res.render('login')},

    profile: function(req,res){res.render('profile',{producto: productos})},
    
     editProfile: function(req,res){
        res.render('profile-edit')
        res.render('index', { productos: productos.usuario})
   
    },

    
    mostrarDatosDeUsuario: function(req,res){
        let nombreDeUsuario = "Pepe Ganga";
        return res.render('profile', {nombre:nombreDeUsuario})
    }
}


    
    module.exports = userController;