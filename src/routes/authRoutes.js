const express = require('express')
const route = express.Router(); //Se crea el objeto rutas para especificar todos los endpoints de la app
const {signUp, singIn} = require('../controllers/authController');

route.get('/', (req, res) => {
    res.json({message: "welcome to auth"});
})

route.post('/singup', signUp);

route.post('/singin', singIn);


module.exports = route;