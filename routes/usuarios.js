const {Router} = require('express');
const {check} = require('express-validator');

const {
    verificarAdmin,
    validarCampo,
    validarJWT

} = require('../middlewares');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post('/',[
    check('nombre', 'El nombre es obligatorio'). not().isEmpty(),
    check('pass', 'La contraseña es obligatoria').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    validarCampo
],usuariosPost);

router.put('/:id',[
    validarJWT,
    validarCampo,
], usuariosPut);

router.delete('/',[
    validarJWT,
    validarCampo,
    verificarAdmin
], usuariosDelete);

module.exports = router;

//en el post despues de yo colocar los chek, debo colocar en orden los middleweres, validartoke, validar admin, validarcampos