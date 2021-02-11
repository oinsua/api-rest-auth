const RolModel = require('../models/rolModel');
const UserModel = require('../models/userModel');

/*Funcion que verifica si el usuario o email que emite el cliente esta en uso actualmente */
const verifyUserAndEmail =async (req, res, next) => {
    try {  
          const user = await UserModel.findOne({username: req.body.username}); //Se busca un usuario con el username
          //En caso de existir se emite un status 405
          if(user) return res.status(405).json({message: `User ${req.body.username} already exists`});
          //Se busca un usuario con este email, de ser asi se emite un status 405
          const user_email = await UserModel.findOne({email: req.body.email});
          if(user_email) return res.status(405).json({message: `Email ${req.body.email} already exists`});
        next();
    } catch (error) {
       res.status(500).json({
           message: "Verify User and Email"
       }) 
    }
}

/*Funcion que verifica si se recibe algun rol, de ser asi se consulta la bd, se obtienen los roles, se asignan a un
arreglo de roles, se obtiene los roles del cliente y se comparan si algun rol del cliente no esta dentro de los 
roles de la base de datos, de ser asi se emite un status 400 */
const verifyRoles = async (req, res, next) => {
    try {
        if(req.body.roles.length > 0){
            const rolesDB = await RolModel.find();
            //Asignar los roles de la base de datos a un arreglo
            const roles = [];
            for (const rol of rolesDB) {
                roles.push(rol.name);
            };
            //Asignar los roles que recibo del cliente en un arreglo
            const rolesUser = req.body.roles;
            //Comparar si algunos de los roles del cliente estan dentro de los roles que estan almacenados en la BD
            for (const rol of rolesUser) {
                if(!roles.includes(rol)) //Si el rol que recibi del cliente no esta dentro del arreglo de roles de la DB
                    return res.status(400).json({ //Emito un status 400
                        message: `Role ${rol} does not exists`
                    })
            }
       }
        next();
    } catch (error) {
        res.status(500).json({
            message: "Verify roles"
        }) 
    }
}



module.exports = {verifyUserAndEmail, verifyRoles};