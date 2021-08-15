const { Router } = require('express');
const { check } = require('express-validator');
const {
  getCategorias,
  getCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// Obtener categorias
router.get('/', getCategorias);

// Obtener categorias por id
router.get('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeCategoriaPorId),
  validarCampos,
  getCategoria,
]);

// Crear categoria con token
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// Actualizar categoria con token
router.put(
  '/:id',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  actualizarCategoria
);

// Borrar categoria solo admiistrador
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
