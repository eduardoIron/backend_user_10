const validarCampos = require('./validar-campos');
const validarJWT = require('./validar-jwt');
const verificarAdmin = require('./validar-admin'); 

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...verificarAdmin,
}