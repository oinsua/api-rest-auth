const express = require('express')
const route = express.Router(); //Se crea el objeto rutas para especificar todos los endpoints de la app
const {createUser, getUsers, getUserById, getUserByName, getUserByEmail, deleteUserByID, updateUserById} 
        = require('../controllers/userController');
const {verifyToken, isAdmin, verifyRoles} = require('../middlewares/index');

route.get('/', getUsers); //Para devolver todos los usuarios

route.get('/:id', getUserById); //Para devolver un usuario a partir del id que envia el cliente

route.get('/:username/username', getUserByName); //Devuelve un usuario a partir de un username que envia el cliente

route.get('/:email/email', getUserByEmail); //Devuelve un usuario a partir de un email si es que existe

route.post('/',[verifyToken, isAdmin, verifyRoles], createUser); //Para crear un nuevo user debo verificar  que tiene un token y que es un admin

route.put('/:id', [verifyToken, isAdmin], updateUserById); //Para modificar un user, debo de verificar el token y el rol

route.delete('/:id', [verifyToken, isAdmin], deleteUserByID); //Para eliminar un user, debo de verificar el token y el rol

module.exports = route;