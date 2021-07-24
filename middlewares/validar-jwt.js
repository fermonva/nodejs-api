const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      msg: 'Token inválido',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // Leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);
    if (!usuario) {
      return res.status(401).json({
        msg: 'Usuario inválido',
      });
    }

    // Verificar si el uid tiene estado en true
    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Usuario inactivo',
      });
    }

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token inválido',
    });
  }
};

module.exports = { validarJWT };
