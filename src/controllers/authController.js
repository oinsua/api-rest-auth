const UserModel = require('../models/userModel');
const {SECRET} = require('../config');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        const {username, email, password} = req.body;//Destructurar los datos recibidos por req.body
        const bcryptPass = await UserModel.encryptPassword(password); //Cifrar el password
        //Crear el objeto user segun las especificaciones del model
        const user = new UserModel({
            username,
            email,
            password: bcryptPass
        })
        //Insertar en la base de datos de mongodb el usuario
        const userInsert = await user.save();
        //Crear el jwt para el cliente
        const token = jwt.sign({id: userInsert._id}, SECRET, {
                                                                   expiresIn: 86400 //24 horas 
                                                                   })
        res.json(token); //Respuesta al cliente del token que se le ha asignado
    } catch (error) {
       res.status(500).json({
           menssage: error
       }) 
    }
}

const singIn = (req, res) => {
    res.json({
        message: "signIn successfully"
    })
}

module.exports = {signUp, singIn};