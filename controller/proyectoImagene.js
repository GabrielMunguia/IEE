const cloudinary = require("cloudinary").v2;
const ProyectoImagene = require("../models/proyectoImagene");

const agregarImagenProyecto = async (req, res) => {
  try {
    const proyecto = req.proyecto;
    const img = req.files.archivo;
    //subo la imagen
    const { tempFilePath } = img;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    const data = {
      idProyecto: proyecto._id,
      img: secure_url,
    };

    const imgProyecto = new ProyectoImagene(data);
    await imgProyecto.save();

    res.json({
      status: true,
      payload: {
        imgProyecto,
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

const obtenerImagenesPorProyecto = async (req, res) => {
  try {
    const idProyecto = req.params.id;

    const query = { idProyecto };
    const [total, imagenes] = await Promise.all([
      await ProyectoImagene.countDocuments(query),
      await ProyectoImagene.find(query),
    ]);

    res.json({
      status: true,
      payload: {
        total,
        imagenes,
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

const eliminarImagen = async (req, res) => {
  try {
    const idImagen = req.params.id;

    const imagen = await ProyectoImagene.findByIdAndDelete(idImagen);


    if (!imagen) {
      return res.status(400).json({
        status: false,
        msj: "No hay ninguna imagen con ese id ",
      });
    }


    const nombreArray = imagen.img.split("/");
    const nombre = nombreArray[nombreArray.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);

    res.json({
      status: true,
      payload: {
        imagen,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msj: "Ocurrio un error comuniquese con el administrador",
    });
  }
};

module.exports = { agregarImagenProyecto, obtenerImagenesPorProyecto,eliminarImagen };
