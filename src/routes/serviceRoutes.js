const express = require('express')
const route = express.Router(); //Se crea el objeto rutas para especificar todos los endpoints de la app
const {
    insertService, 
    getServices, 
    getServiceById, 
    deleteServiceByID, 
    updateServiceById,
    getServiceByCode,
    getServiceByName,
    getServiceByTotal
 } = require('../controllers/serviceController');

 //Importar los middleware que se encargan de verificar si existe un token valido para ejecutar insert, update, delete
 const {verifyToken, isModerator, isAdmin} = require('../middlewares/index');

route.get('/', getServices); //Se muestran todos los servicios

route.get('/:id', getServiceById); //Se muestra un servicio segun su id

route.post('/',[verifyToken, isModerator], insertService); //Se crea y se inserta un nuevo servicio en mongoDB

route.put('/:id',[verifyToken, isModerator], updateServiceById); //Se actualiza un producto segun su id

route.delete('/:id',[verifyToken, isAdmin], deleteServiceByID); //Se elimina un producto segun su id

route.get('/:code/code', getServiceByCode); //Buscar los servicios que coincidan con el codigo especificado

route.get('/:name/name', getServiceByName); //Buscar los servicios que coincidan con el codigo especificado

route.get('/:total/total', getServiceByTotal); //Buscar los servicios que coincidan con el codigo especificado


module.exports = route;