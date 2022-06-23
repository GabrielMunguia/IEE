const Voluntario = require("../models/Voluntario");
const cloudinary = require("cloudinary").v2;
const crearVoluntario = async (req, res = response) => {
    try {
  
      const {...data }=req.body;
  
      const voluntario = new Voluntario(data);
  
      if (req.files) {
        const img = req.files.archivo;
  
        //Si viene la imagen la actualizo
        if (img) {
          if (voluntario.img) {
            //Elimino la imagen antigua del servidor
            const nombreArray = voluntario.img.split("/");
            const nombre = nombreArray[nombreArray.length - 1];
            const [public_id] = nombre.split(".");
            cloudinary.uploader.destroy(public_id);
          }
  
          //subo la imagen
          const { tempFilePath } = req.files.archivo;
          const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
          voluntario.img = secure_url;
        }
      }
  
      await voluntario.save();
  
      res.json({
        status: true,
        payload: {
          voluntario: voluntario,
        },
      });
  
      
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        status: false,
        msj: "Ocurrio un error comuniquese con el administrador",
      });
    }
  };

 
  const actualizarVoluntario = async (req, res = response) => {
    try {
      const { id } = req.params;
      const {...data }=req.body;
      const voluntario = await Voluntario.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (req.files) {
        const img = req.files.archivo;
        if (img) {
          if (voluntario.img) {
            //Elimino la imagen antigua del servidor
            const nombreArray = voluntario.img.split("/");
            const nombre = nombreArray[nombreArray.length - 1];
            const [public_id] = nombre.split(".");
            cloudinary.uploader.destroy(public_id);
          }
          //subo la imagen
          const { tempFilePath } = req.files.archivo;
          const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
          voluntario.img = secure_url;
        }
      }
      await voluntario.save();
      res.json({
        status: true,
        payload: {
          voluntario: voluntario,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        msj: "Ocurrio un error comuniquese con el administrador",
      });
    }
  }

  const eliminarVoluntario = async (req, res = response) => {
    try {
      const { id } = req.params;
      const voluntario = await Voluntario.findByIdAndDelete(id);
      if (voluntario.img) {
        //Elimino la imagen antigua del servidor
        const nombreArray = voluntario.img.split("/");
        const nombre = nombreArray[nombreArray.length - 1];
        const [public_id] = nombre.split(".");
        cloudinary.uploader.destroy(public_id);
      }
      res.json({
        status: true,
        payload: {
          voluntario: voluntario,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        msj: "Ocurrio un error comuniquese con el administrador",
      });
    }
  }

  const getVoluntario = async (req, res = response) => {
    try {
      const { id } = req.params;
      const voluntario = await Voluntario.findById(id);
      res.json({
        status: true,
        payload: {
          voluntario: voluntario,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        msj: "Ocurrio un error comuniquese con el administrador",
      });
    }
  }



const getVoluntarios = async (req, res = response) => {
    try {
      const voluntarios = await Voluntario.find().populate("grado").populate("capitulo");
      res.json({
        status: true,
        payload: {
          voluntarios,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        msj: "Ocurrio un error comuniquese con el administrador",
      });
    }
  }


  module.exports = {
    crearVoluntario,
    getVoluntarios,
    actualizarVoluntario,
    eliminarVoluntario,
    getVoluntario,
}