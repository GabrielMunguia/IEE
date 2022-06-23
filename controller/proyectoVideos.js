
const ProyectoVideos = require("../models/proyectoVideos");

const agregarVideoProyecto = async (req, res) => {

  try {
    const proyecto = req.proyecto;
    const video = req.body.video;

     const data={
         video,
         idProyecto:proyecto._id
     }
    const videoProyecto = new ProyectoVideos(data);
    await videoProyecto.save();
    res.json({
      status: true,
      payload: {
         videoProyecto,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msj: "Ocurrio un error comuniquese con el administrador",
    });
  }
};





const obtenerVideosPorProyecto = async (req, res) => {
  try {
    const idProyecto = req.params.id;

    const query = { idProyecto };
    const [total, videos] = await Promise.all([
      await ProyectoVideos.countDocuments(query),
      await ProyectoVideos.find(query),
    ]);

    res.json({
      status: true,
      payload: {
        total,
        videos,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      msj: "Ocurrio un error comuniquese con el administrador",
    });
  }
};

const eliminarVideo = async (req, res) => {
  try {
    const idVideo = req.params.id;

    const video = await ProyectoVideos.findByIdAndDelete(idVideo);


    if (!video) {
      return res.status(400).json({
        status: false,
        msj: "No hay ningun video con ese id ",
      });
    }


   

    res.json({
      status: true,
      payload: {
         video,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msj: "Ocurrio un error comuniquese con el administrador",
    });
  }
};

module.exports = { agregarVideoProyecto,  obtenerVideosPorProyecto, eliminarVideo };
