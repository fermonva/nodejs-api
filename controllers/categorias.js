const { response, request } = require('express');
const { Categoria } = require('../models');

// obtenerCategorias - paginado - total - populate
const getCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate('usuario', 'nombre')
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.status(200).json({
    total,
    categorias,
  });
};

// obtenerCategoria - populate
const getCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const query = { estado: true };
  const categoria = await Categoria.findById(id)
    .find(query)
    .populate('usuario', 'nombre');
  /* if (!categoria) {
    res.status(404).json({
      msg: 'No existe la categoria',
    });
  } */
  res.status(200).json(categoria);
};

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La Categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  //   Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  //   Guardar la categoria
  await categoria.save();
  res.status(201).json(categoria);
};

const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json(categoria);
};

const borrarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.status(200).json(categoria);
};

module.exports = {
  getCategorias,
  getCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
};
