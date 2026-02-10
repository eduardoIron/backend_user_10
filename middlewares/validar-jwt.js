const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No existe token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const usuario = await Usuario.findByPk(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token invalido-Usuario no se encuentra en la BD",
      });
    }

    // Verify if the uid has state true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Toekn invalido - Uusario no esta activo",
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token invalido",
    });
  }
};

module.exports = {
  validarJWT,
};
