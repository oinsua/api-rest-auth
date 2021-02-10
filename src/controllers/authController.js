//Importando los modelos de datos de mongodb
const UserModel = require('../models/userModel');
const RolModel = require('../models/rolModel');
//Importar la clave secreta de las variables de entorno
const {SECRET} = require('../config');

const jwt = require('jsonwebtoken');

/*Funcion que se encarga de recibir los datos de un nuevo user, de encriptar el password, 
de verificar roles, de realizar el registro de un nuevo user en la base de datos de mongodb,
de devolver el token al cliente*/
const signUp = async (req, res) => {
    try {
        const {username, email, password, roles} = req.body;//Destructurar los datos recibidos por req.body
        const bcryptPass = await UserModel.encryptPassword(password); //Cifrar el password
        //Crear el objeto user segun las especificaciones del model
        const user = new UserModel({
            username,
            email,
            password: bcryptPass
        })

        if(roles){
            const res_roles = await RolModel.find({name: {$in: roles}}) //Buscar los roles que son iguales
            user.rol = res_roles.map(rol => rol._id);
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
                                                                   })
        res.json(token); //Respuesta al cliente del token que se le ha asignado
    } catch (error) {
       res.status(500).json({
           menssage: error
       }) 
    }
}
/*Funcion que se encarga de recibir el email y el password de un user, verifica que existe el user,
en caso contrario retorna un status 400, comprueba que los password coinciden, en caso contrario retorna un status 401. 
De haber pasado todas las pruebas, se crea un new token y se le devuelve al user*/
const singIn = async  (req, res) => {
   try {
        const {email, password} = req.body;  //Recibir los datos y asignarlos por destructuracion
        const userExist = await UserModel.findOne({email: email}); //Verificar que existe un usuario con ese email
        if(!userExist) return res.status(400).json({message: "User not found"}) //Si no existe retorno un status 400
        const matchPass = await UserModel.comparePassword(password, userExist.password);//Verificar que son identicos los password
        if(!matchPass) return res.status(401).json({token: null, message: "Invalid Password"});//Si no es asi, retorno un status 401
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

module.exports = {signUp, singIn};