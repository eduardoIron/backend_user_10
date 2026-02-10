const { response, request } = require("express");
const Usuario = require("../models/usuario");

const verificarAdmin = async(req=request, res=response, next) =>{
    if(req.usuario.rol !== 'ADMIN_USER'){
        return res.status(401).json({
        msg: "Solo el administrador puede dar de baja a usuarios",
      });
    }
    next();
}

module.exports = {verificarAdmin};