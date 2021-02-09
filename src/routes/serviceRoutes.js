const express = require('express')
const route = express.Router(); //Se crea el objeto rutas para especificar todos los endpoints de la app
const {insertService, getServices, getServiceById, deleteServiceByID, updateServiceById} = require('../controllers/serviceController');

route.post('/', insertService) //Se crea y se inserta un nuevo servicio en mongoDB

route.put('/:id', updateServiceById) //Se actualiza un producto segun su id

route.delete('/:id', deleteServiceByID) //Se elimina un producto segun su id

route.get('/', getServices) //Se muestran todos los servicios

route.get('/:id', getServiceById) //Se muestra un servicio segun su id

module.exports = route;