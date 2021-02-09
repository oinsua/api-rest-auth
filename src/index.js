const {app, server} = require('./app');

server.listen(app.get('port'), ()=> { //Se inicia el servidor por el puerto especificado
    console.log(`Server is running at port ${app.get('port')}`);
})