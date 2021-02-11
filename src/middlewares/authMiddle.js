const jwt = require('jsonwebtoken');
const {SECRET} = require('../config');
const UserModel = require('../models/userModel');
const RolModel = require('../models/rolModel');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"]; //Extraer el token de la cabecera recibida del cliente
    //Verifico que se haya reibido un token
     if(!token) return res.status(403).json({message: "No token provided"}); 
     const res_token = jwt.verify(token, SECRET); //Se verifica que el token se cifro con la clave correspondiente, se almacena el result
     req.userID = res_token.id; //Se almacena en req el Id del user para ser usado en las funciones isModerator isAdmin
     //Verifico que el usuario que me envian existe en la base de datos mongodb
     const user = await UserModel.findById(req.userID, {password: 0});
     if(!user) return res.status(404).json({message: "no user found"});
     next(); //Pasando a la nueva tarea.
  } catch (error) {
      res.status(501).json({message: "Unauthorized"});
  }
};

const isModerator = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userID); //Se verifica que el usuario existe a partir de id
        if(!user) return res.status(400).json({message: "User not found"}); //Si no existe, se retorna un status 400
        const roles = await RolModel.find({_id: {$in: user.rol}}); //Se obtienen todos los roles del usuario
        for (const rol of roles) {  //Se recorre en el ciclo, si hay algun roll que coincide con moderator
            if(rol.name === 'moderator') {next(); return;} //Se pasa a la siguiente tarea
        }; 
        return res.status(407).json({message: "User is not Moderator"}); //en caso de no encontrar el rol se emite un 407
    } catch (error) {
        res.status(508).json({message: "Error 500 at isModerator"}) //Si falla el try se emite un status 508
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.userID); //Se verifica que el usuario existe a partir de id
        if(!user) return res.status(400).json({message: "User not found"}); //Si no existe, se retorna un status 400
        const roles = await RolModel.find({_id: {$in: user.rol}}); //Se obtienen todos los roles del usuario
        for (const rol of roles) {  //Se recorre en el ciclo, si hay algun roll que coincide con moderator
            if(rol.name === 'admin') {next(); return;} //Se pasa a la siguiente tarea
        }; 
        return res.status(407).json({message: "User is not Admin"}); //en caso de no encontrar el rol se emite un 407
    } catch (error) {
        res.status(508).json({message: "Error 500 at isModerator"}) //Si falla el try se emite un status 508
    }
}


module.exports = {verifyToken, isModerator, isAdmin};