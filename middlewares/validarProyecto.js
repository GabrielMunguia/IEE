const Proyecto = require("../models/proyectos");

const validarProyecto = async (req, res = response, next) => {
try {
    const idProyecto = req.params.id;
    const proyecto = await Proyecto.findById(idProyecto);
  
    if (!proyecto) {
     return  res.status(400).json({
        status: false,
        msj: "No existe ninguna proyecto con ese id",
      });
    }
  
    req.proyecto=proyecto;
    next();
} catch (error) {
  console.log(error)
    return res.status(500).json({
        status: false,
        msj: "Ocurrio un error comuniquese con el administrador",
      });
}
};

module.exports = { validarProyecto };
