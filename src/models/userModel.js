//Importar conexion a mongodb
const mongoose = require('../database');
//Importa bcrypt para cifrar el password
const bcrypt = require('bcrypt');
const { Mongoose } = require('mongoose');

const UserSchema = new mongoose.Schema({
     username: {
         type: String,
         required: true,
         unique: true,
         trim: true
     },
     email: {
         type: String,
         required: true,
         unique: true,
         trim: true
     },
     password: {
         type: String,
         required: true
     },
     rol: [{
         ref: "Rol",
         type: mongoose.Schema.Types.ObjectId
     }]
})

//Se define una funcion para encriptar el password
UserSchema.statics.encryptPassword = async (password) => {
    const res = await bcrypt.genSalt(10); //Se especifica cuantas veces se aplica el algoritmo bcrypt
    return await bcrypt.hash(password, res); //Se le aplica el hash con el res y se devuelve el password encriptado
}

//Se define una funcion para comparar los dos password
UserSchema.statics.comparePassword = async (password, newpassword) => {
    return await bcrypt.compare(password, newpassword);
}



module.exports = mongoose.model('User', UserSchema);