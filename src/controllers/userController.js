//Importando los modelos de datos de mongodb
const UserModel = require('../models/userModel');
const RolModel = require('../models/rolModel');
//Importar la clave secreta de las variables de entorno
const {SECRET} = require('../config');

const jwt = require('jsonwebtoken');

//Funcion que se encarga de buscar y retornar todos los usuarios que se encuentran almacenados en mongoDB
const getUsers = async (req, res) => {
    try {
       const allUser = await UserModel.find(); //Se buscan todos los usuarios de la collections
       res.json(allUser); //Se emiten los usuarios
    } catch (error) {
       res.status(500).json({
          message: error
       })
    }  
 };

 //Funcion que se encarga de buscar un usuario por id
 const getUserById = async (req, res) => {
    try { 
       const oneUser = await UserModel.findById(req.params.id); //Se busca el usuario por un id especificado
       res.json(oneUser); //Se emite el usuario
    } catch (error) {
       res.status(500).json({
          message: error
       })}
}

//Funcion que gestiona el proceso de busqueda de los usuarios por username
const getUserByName = async (req, res) => {
    try { 
       const user_name = decodeURI(req.params.username);
       const resUser = await UserModel.find({username: user_name}); //Se buscan los usuarios que coincidan con username
    
       res.json(resUser); //Se emiten los usuarios coincidentes
    } catch (error) {
       res.status(500).json({
          message: error
       })}
 }

 //Funcion que gestiona el proceso de busqueda de los usuarios por email
const getUserByEmail = async (req, res) => {
    try { 
       const user_email = decodeURI(req.params.email);
       const userEmail = await UserModel.find({email: user_email}); //Se buscan los usuarios que coincidan con email
       res.json(userEmail); //Se emiten los usuarios coincidentes
    } catch (error) {
       res.status(500).json({
          message: error
       })}
 }

//Funcion que se encarga de insertar un nuevo usuario, de cifrar el password, y de asignarle un token
const createUser = async (req, res) => {
    try { 
        const {username, email, password, roles} = req.body;//Destructurar los datos recibidos por req.body
        const bcryptPass = await UserModel.encryptPassword(password); //Cifrar el password
        //Crear el objeto user segun las especificaciones del model
        const user = new UserModel({
            username,
            email,
            password: bcryptPass
        })

        if(roles){ //Si se la variable roles entonces se procede a incorporarla
            const res_roles = await RolModel.find({name: {$in: roles}}) //Buscar los roles que son iguales
            user.rol = res_roles.map(rol => rol._id); //Se recorre el array para obtener solo los id 
         }
         else{
            const rol = await RolModel.findOne({name: "user"}); //Voy a buscar solo el rol user por defecto
            user.rol = [rol._id];
         }
        //Insertar en la base de datos de mongodb el usuario
        const userInsert = await user.save(); 
        //Crear el jwt para el cliente
        const token = jwt.sign({id: userInsert._id}, SECRET, {
                                                                   expiresIn: 86400 //24 horas 
                                                                   });
        res.json(token); //Respuesta al cliente del token que se le ha asignado
    } catch (error) {
       res.status(500).json({
           menssage: "Error at Json Data"
       }) 
    }
};

//Funcion que se encarga del proceso de eliminar un usuario en la base de datos mongoDB
const deleteUserByID =  async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.json({
           message: `User ${req.params.id} have been delete successfully`
        })
    } catch (error) {
       res.status(500).json({
          message: error
       })
    }   
 }
//Funcion que se encarga del proceso de actualizar un usuario a partir de un id
 const updateUserById = async (req, res) => {
    try {
       await UserModel.findByIdAndUpdate(req.params.id, req.body);
       res.json({
          message: `User ${req.params.id} have been update successfully`
       })
    } catch (error) {
       res.status(500).json({
          message: error
       })
    }    
 }


module.exports = {createUser, getUsers, getUserById, getUserByName, getUserByEmail, deleteUserByID, updateUserById};