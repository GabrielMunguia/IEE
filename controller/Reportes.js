const Voluntario = require('../models/Voluntario');
const Proyecto = require('../models/proyectos');
const reporteGeneral = async (req, res) => {
  try {
    //obtener la canntidad de Voluntarios
    const cantidadVoluntarios = await Voluntario.countDocuments();
    //cantidade proyects
    const cantidadProyectos = await Proyecto.countDocuments();

    res.json({
      status: true,
      payload: {
        cantidadVoluntarios,
        cantidadProyectos,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msj: 'Ocurrio un error comuniquese con el administrador',
    });
  }
};
module.exports = {
  reporteGeneral,
};
