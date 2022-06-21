var express = require('express');
var router = express.Router();
var userController = require("../controladores/userController")


router.get('/register', userController.registro);
router.post('/register', userController.almacenarRegistro);
router.get('/login', userController.login);
router.post('/login', userController.procesarLogin);
router.get('/perfil', userController.profile);
router.get('/editar-perfil', userController.editProfile);
router.post('/logout', userController.logout);

module.exports = router;
