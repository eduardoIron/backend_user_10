const { Op } = require('sequelize');
const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
    const { correo, pass, numCuenta } = req.body;

    try {

        //const usuario = await Usuario.findOne({ where: { correo} });

        const usuario = await Usuario.findOne({
            where: {
                [Op.or]: [
                    { correo: correo || '' },     
                    { numCuenta: numCuenta || '' }
                ]
            }
        });

        console.log(`NumCuenta: ${numCuenta}`);
        console.log(`Correo: ${correo}`);
        
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario no encontrado - verifique Correo/Numero de cuenta",
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario inactivo (Baja)",
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
            msg: "Error al iniciar sesion intente mas tarde",
        });
    }
};

module.exports = { login };