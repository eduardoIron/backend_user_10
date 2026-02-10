const express = require("express");
const cors = require("cors");
const {db} = require("./database/config");
require("./models/usuario");
require("./models/bitacora");


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //paths de la carpeta routes
    this.paths = {
      auth: "/api/auth",
      usuarios: "/api/usuarios"
    };

    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    try {
      await db.authenticate();
      console.log("Conexion establecida exitosamente");
      //si la tabla aun no existe
      await db.sync();
    } catch (error) {
      console.error("Incapaz de conectar a la base de datos", error);
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    // this.app.use(express.static('public'));
  }
  //colocar las rutas de los archivos de la carpeta routes
  routes() {
    this.app.use(this.paths.auth, require('./routes/auth'));
    this.app.use(this.paths.usuarios, require('./routes/usuarios'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en el puerto ", this.port);
    });
  }
}

module.exports = Server;
