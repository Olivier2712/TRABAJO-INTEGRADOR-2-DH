var express = require('express');
var router = express.Router();
var userController = require("../controladores/userController")

router.get('/register', userController.registro);
router.get('/login', userController.login);
router.get('/perfil', userController.profile);
router.get('/editar-perfil', userController.editProfile);

module.exports = router;
