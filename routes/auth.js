const {Router} = require('express');
const {check} = require('express-validator');
const {login} = require('../controllers/auth');
const {validarCampo} = require('../middlewares/validar-campos');

const router = Router();

router.post('login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('pass', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampo
])

module.exports = router;