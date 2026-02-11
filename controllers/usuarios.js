const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");


const usuariosGet = async (req, res) => {
    const usuarios = await Usuario.findAll({ where: { estado: 1 } });
    res.json(usuarios);
};


const usuariosPost = async (req, res = response) => {
    const { nombre, correo, pass, rol, numCuenta, numCelular } = req.body;
    
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
        usuario,
    });
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

    res.json(usuario);
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
};