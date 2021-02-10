const dotenv = require('dotenv').config();

module.exports ={
    NODE_ENV : process.env.NODE_ENV,
        HOST : process.env.HOST,
        PORT : process.env.PORT,
 MONGODB_URI : process.env.MONGODB_URI,
      SECRET : process.env.SECRET
}

