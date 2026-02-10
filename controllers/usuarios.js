const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req, res) => {
  // const {id} =req.params;
  // const usuarios = await Usuario.findAll({where:{id_usuario: id}});
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, pass, rol } = req.body;
  const usuario = Usuario.build({ nombre, correo, pass, rol });

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
  await usuario.update(resto);

  res.json(usuario);
};

const usuariosDelete = async (req, res = response) => {

  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  await usuario.update({ activo: false });

  res.json(usuario);
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
