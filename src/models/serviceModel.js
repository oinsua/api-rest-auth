//Importar conexion a mongodb
const {Schema, model} = require('../database');

const ServSchema = new Schema({
                               code: {
                                   type: String,
                                   required: true,
                                   unique: true,
                                   trim: true
                               },
                               name: {
                                   type: String,
                                   required: true,
                                   trim: true
                               },
                               um: {
                                    type: String,
                                    required: true,
                                    trim: true
                               },
                               quantity: {
                                    type: Number,
                                    required: true,
                                    trim: true
                                 },
                                price: {
                                    type: Number,
                                    required: true,
                                    trim: true
                                 },
                                 total: {
                                    type: Number,
                                    required: true,
                                    trim: true
                                 },

                       }, 
                       {
                        versionKey: false, //para evitar que en la BD no aparezca __v
                        timestamps: true  //Cuando creo una nueva coleccion se agrega una propiedad "createAt" y "updateAt"
                       }
                 )

module.exports = model('Service', ServSchema)