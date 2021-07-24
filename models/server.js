const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = '/api/auth';
    this.usuariosPath = '/api/usuarios';

    // Conectar a DB
    this.conectarDB();
    // Middlewares
    this.middlewares();

    // Lectura y parseo del body para los endpoint
    this.app.use(express.json());

    // Rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth'));
    this.app.use(this.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port);
  }
}

module.exports = Server;
