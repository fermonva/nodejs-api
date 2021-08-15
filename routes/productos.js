const { Router } = require('express');
const { check } = require('express-validator');
const {
  getProductos,
  getProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} = require('../controllers/productos');

const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// Obtener producto
router.get('/', getProductos);

// Obtener producto por id
router.get('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeProductoPorId),
  validarCampos,
],
  getProducto,
);

// Crear producto con token
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos,
  ],
  crearProducto
);

// Actualizar producto con token
router.put(
  '/:id',
  [
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  actualizarProducto
);

// Borrar producto solo admiistrador
router.delete(
  '/:id',
  [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos,
  ],
  borrarProducto
);

module.exports = router;