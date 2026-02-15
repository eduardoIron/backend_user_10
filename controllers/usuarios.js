const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const Bitacora = require("../models/bitacora");
const {json} = require('sequelize');



const usuariosGet = async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
};


const usuariosPost = async (req = request, res = response) => {
    const { nombre, correo, pass, rol, numCuenta, numCelular } = req.body;

    try {
        const usuario = Usuario.build({ 
            nombre, 
            correo, 
            pass, 
            rol, 
            numCuenta, 
            numCelular 
        });

        const salt = bcryptjs.genSaltSync();
        usuario.pass = bcryptjs.hashSync(pass, salt);

        await usuario.save();

        res.json({
            usuario
        });

        await Bitacora.create({
            accion: `Registro del usuario ${usuario.correo}`,
            id_usuario: usuario.id
        });


    } catch (error) {
        console.log('???',error); 
        res.status(500).json({
            msg: 'Hable con el administrador',
            error: error.message 
        });
    }
};


const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const { id: _id, pass, correo, ...resto } = req.body;


    if (pass) {
        const salt = bcryptjs.genSaltSync();
        resto.pass = bcryptjs.hashSync(pass, salt);
    }

    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.update(resto);
        res.json(usuario);

        await Bitacora.create({
            accion:`Actulizacion de datos del usuario con id: ${usuario.id}`,
            id_usuario: id
        });
        
    } else {
        res.status(404).json({ msg: "Usuario no encontrado" });
    }
};


const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }


    await usuario.update({ estado: 0 });

    await Bitacora.create({
        accion:`El usuario con id: ${id} ha sido dado de baja`,
        id_usuario: id
    });

    res.json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
};