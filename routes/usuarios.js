const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampo,
    validarJWT,
    verificarAdmin
} = require('../middlewares'); 

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('pass', 'La contraseña es obligatoria').not().isEmpty(),
    check('correo', 'No es un correo válido').isEmail(),
    //validarJWT,      
    //verificarAdmin,  
    validarCampo
], usuariosPost);

router.put('/:id', [
    validarJWT,
    validarCampo,
], usuariosPut);

router.delete('/:id', [
    validarJWT,
  // verificarAdmin,
    validarCampo
], usuariosDelete);

module.exports = router;