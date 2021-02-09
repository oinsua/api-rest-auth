const {app, server} = require('./app');
require('./database'); //Se importa la conexion a la base de datos Auth

server.listen(app.get('port'), ()=> { //Se inicia el servidor por el puerto especificado
    console.log(`Server is running at port ${app.get('port')}`);
})