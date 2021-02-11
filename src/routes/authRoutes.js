const express = require('express')
const route = express.Router(); //Se crea el objeto rutas para especificar todos los endpoints de la app
const {signUp, singIn} = require('../controllers/authController'); //Importar las funciones controladoras
const {verifyUserAndEmail, verifyRoles} = require('../middlewares/index');

route.get('/', (req, res) => {
    res.json({message: "welcome to auth"});
})

route.post('/singup',[verifyUserAndEmail, verifyRoles], signUp); //Crear un nuevo usuario, verifica User, Email y Roles

route.post('/singin', singIn); //Veriicar si el usuario esta registrado


module.exports = route;