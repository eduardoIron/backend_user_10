const { response } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
    const { correo, pass } = req.body;

    try {

        const usuario = await Usuario.findOne({ where: { correo } });
        
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario no encontrado - verifique correo",
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
                msg: "Contraseña incorrecta",
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
            msg: "Hable con el administrador",
        });
    }
};

module.exports = { login };