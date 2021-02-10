const mongoose = require('mongoose');
const {MONGODB_URI} = require('./config');

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
        .then(db => console.log(`db is connected to database ${db.connection.name}`)) //En caso correcto mensaje de exito
        .catch(error => console.log(`db is not connected, error : ${error}`)) //En caso de error mensaje de error

module.exports = mongoose; 