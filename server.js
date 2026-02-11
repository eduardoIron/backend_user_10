const express = require('express');
const cors = require('cors'); 
const { db } = require('./database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';


        this.conectarDB();


        this.middlewares();


        this.routes();
    }

    async conectarDB() {
        try {
            await db.authenticate();

            await db.sync({ force: false }); 
            console.log('Conexion exitosa con la base de datos');
        } catch (error) {
            throw new Error(error);
        }
    }

    middlewares() {

        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('./routes/auth'));
        this.app.use(this.usuariosPath, require('./routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;