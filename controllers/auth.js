const { Op } = require('sequelize');
const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {

    const { correo, numCuenta, acceso, pass } = req.body;

    const terminoBusqueda = correo || numCuenta ;

    try {
        const usuario = await Usuario.findOne({
            where: {
                [Op.or]: [
                    { correo: terminoBusqueda },
                    { numCuenta: terminoBusqueda }
                ]
            }
        });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            });
        }

        if(!usuario.estado){
            return res.status(400).json({
                msg: "Usuario inactivo",
            });
        }
        const validPassword = bcryptjs.compareSync(pass, usuario.pass);
      
       if (!validPassword) {
           return res.status(400).json({
               msg: "Contraseña incorrectaahhhh",
           });
       }


       const token = await generarJWT(usuario.id);


       res.json({
           usuario,
           token,
       });


        


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor al buscar usuario'
        });
    }
}

module.exports = { login };