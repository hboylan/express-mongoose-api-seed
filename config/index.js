var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , env = process.env.NODE_ENV || 'development'
  , port = 8000
  , admin = {
    "role": "admin",
    "email": "thinkerton5@gmail.com",
    "password": "password1",
    "name": "John Barnack"
  }

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-mongoose-api-seed'
    },
    port: port,
    db: 'mongodb://localhost/db-development',
    admin: admin,
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-mongoose-api-seed'
    },
    port: port,
    db: 'mongodb://localhost/db-production',
    admin: admin,
  }
};

module.exports = config[env];
