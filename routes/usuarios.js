const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require('../helpers/db-validators');
const {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios,
} = require('../controllers/usuarios');
const router = Router();

router.get('/', getUsuarios);

router.put(
  '/:id',
  [
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos,
  ],
  putUsuarios
);

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos,
  ],
  postUsuarios
);

router.delete(
  '/:id',
  [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un Id Valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
  ],
  deleteUsuarios
);

module.exports = router;
