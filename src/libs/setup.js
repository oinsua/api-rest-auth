const RolSchema = require('../models/rolModel');

const createRol = async () => {
    try {
         const count_rol = await RolSchema.estimatedDocumentCount(); //Contar la cantidad de roles que existen en la collections
         if(count_rol > 0) return; //Si existen roles salgo de la funcion
         //Insertar en la base de datos de mongoDB todos los roles
         const allRol = await Promise.all([ //Se ejecuta la insercion en paralelo
             new RolSchema({name: "user"}).save(),
             new RolSchema({name: "moderator"}).save(),
             new RolSchema({name: "admin"}).save()
         ]);

    } catch (error) {
        console.log('menssage: ', error);
    }
}

module.exports = createRol;