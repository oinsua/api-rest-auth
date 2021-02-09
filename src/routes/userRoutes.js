const express = require('express')
const route = express.Router(); //Se crea el objeto rutas para especificar todos los endpoints de la app

route.get('/', (req, res) => {
    res.json({message: "welcome users"});
})

module.exports = route;