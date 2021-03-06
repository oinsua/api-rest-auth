//Importar conexion a mongodb
const {Schema, model} = require('../database');

const RolSchema = new Schema({
      name: {
          type: String,
          required: true, //Es requerido
          trim: true //Eliminar los espacios en blancos 
      },
}, 
  {
    versionKey: false, //para evitar que en la BD no aparezca __v
    timestamps: true  //Cuando creo una nueva coleccion se agrega una propiedad "createAt" y "updateAt"
   }
)

module.exports = model('Rol', RolSchema);