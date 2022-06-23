const validarGrado = (req, res, next) => {
  const { grado } = req.body;
  if (!grado) {
    return res.status(400).json({
      estado: false,
      mensaje: "El grado es obligatorio",
    });
  }
  if (grado.length > 0) {
    
    return next();
  }

  res.status(400).json({
    estado: false,
    mensaje: "El grado es obligatorio",
  });
};
module.exports = {
  validarGrado,
};
