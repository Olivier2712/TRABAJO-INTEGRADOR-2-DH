const userController = {
    registro: function(req,res){res.render('register')},
    login: function(req,res){res.render('login')},
    profile: function(req,res){res.render('profile')},
    editProfile: function(req,res){
        res.render('profile-edit')
        res.render('index', { productos: productos.usuario})
    
    },
  
}

    
    module.exports = userController;