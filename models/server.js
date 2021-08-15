const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      authPath: '/api/auth',
      categoriasPath: '/api/categorias',
      productosPath: '/api/productos',
      usuariosPath: '/api/usuarios',
    };

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
    this.app.use(this.paths.authPath, require('../routes/auth'));
    this.app.use(this.paths.categoriasPath, require('../routes/categorias'));
    this.app.use(this.paths.productosPath, require('../routes/productos'));
    this.app.use(this.paths.usuariosPath, require('../routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port);
  }
}

module.exports = Server;
