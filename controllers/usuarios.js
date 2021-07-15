const { request, response } = require('express');

const getUsuarios = (req, res = response) => {
  const { q, nombre } = req.query;
  res.json({
    msg: 'get Api - controller',
    q,
    nombre,
  });
};

const putUsuarios = (req = request, res = response) => {
  const { id } = req.params;
  res.json({
    msg: 'put Api',
    id,
  });
};

const postUsuarios = (req = request, res = response) => {
  const { nombre, edad } = req.body;
  res.status(201).json({
    msg: 'post Api',
    nombre,
    edad,
  });
};

const deleteUsuarios = (req, res = response) => {
  res.json({
    msg: 'delete Api',
  });
};

module.exports = {
  getUsuarios,
  putUsuarios,
  postUsuarios,
  deleteUsuarios,
};
