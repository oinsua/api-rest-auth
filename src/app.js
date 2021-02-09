const express = require('express');
const http = require('http');
const cors = require('cors') //Se utiliza pra establecer las direcciones a traves de las cuales se van a recibir las solicitudes
const morgan = require('morgan') //Se utiliza para visualizar por consola las peticiones http
const {PORT} = require('./config');//Se importa el puerto de las variables de entorno
const pkg = require('../package.json'); //Se importa el objeto package.json
//Importar todas la rutas
const auth_routes = require('./routes/authRoutes');
const serv_routes = require('./routes/serviceRoutes');
const user_routes = require('./routes/userRoutes');

 
//Setings
const app = express(); //Se crea el objeto app
const server = http.createServer(app); //Se crea el servidor a traves del objeto http
//Middlewares
cors_options = {
    origin: '*'
}
app.use(cors(cors_options)); //Para establecer las direcciones http a traves de las cuales se reciben las solicitudes
app.use(morgan('dev')); //Para ver las peticiones por consola
app.use(express.json()); //Para poder trabajar con objetos json.
app.use(express.urlencoded({extended: false})) //Permite que la app pueda recibir solicitudes desde formularios html


//Routes
app.set('port', PORT)//Se define el puerto por defecto
app.set('pkg', pkg) //Se almacena el objeto que continen la informacion del package.json
app.get('/', (req, res) => { //Se muestra en el navegador un mensaje de bienvenida para comprobar el estado de la aplicacion
    res.json({
        message: "Welcome to my application",
          name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});
//Se agregan las rutas a la app
app.use('/auth', auth_routes);
app.use('/serv', serv_routes);
app.use('user', user_routes);

module.exports = {app, server};