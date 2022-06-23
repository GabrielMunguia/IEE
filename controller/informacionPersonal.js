const { response } = require("express");
const InformacionPersonal = require("../models/informacionPersonal");
const cloudinary = require("cloudinary").v2;


const crearInformacionPersonal = async (req, res = response) => {
  try {
    const descripcion = req.body.descripcion.toUpperCase();
    const titulo = req.body.titulo.toUpperCase();

    const informacionPersonal = new InformacionPersonal({ titulo, descripcion });

    if (req.files) {
      const img = req.files.archivo;

      //Si viene la imagen la actualizo
      if (img) {
        if (informacionPersonal.img) {
          console.log(informacionPersonal.img);
          //Elimino la imagen antigua del servidor
          const nombreArray = informacionPersonal.img.split("/");
          const nombre = nombreArray[nombreArray.length - 1];
          const [public_id] = nombre.split(".");
          cloudinary.uploader.destroy(public_id);
        }

        //subo la imagen
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        informacionPersonal.img = secure_url;
      }
    }

    await informacionPersonal.save();

    res.json({
      status: true,
      payload: {
         informacionPersonal,
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

const obtenerInformacionPersonal = async (req, res) => {
  try {
    const informacionPersonal = await InformacionPersonal.find();

    res.json({
      status: true,
      payload: {
         informacionPersonal,
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


const obtenerInformacionPersonales = async (req, res) => {
  try {

    const id = req.params.id;
    const informacionPersonal = await InformacionPersonal.findById(id);
    if(!informacionPersonal){
      return  res.status(400).json({
        status: false,
        msj: "No existe ningun registro con ese id con ese id ",
      });
    }
    res.json({
      status: true,
      payload: {
         informacionPersonal,
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

const actualizarInformacionPersonal = async (req, res) => {
  try {
    const id = req.params.id;
    const informacionPersonal = await InformacionPersonal.findById(id);

    if(!informacionPersonal){
      return  res.status(400).json({
        status: false,
        msj: "No existe ningun registro con ese id con ese id ",
      });
    }

   
  
if(req.body.titulo){
  const titulo = req.body.titulo.toUpperCase();

  if (titulo) {
    informacionPersonal.titulo = titulo;
  }
}
if(req.body.descripcion){
  const descripcion = req.body.descripcion.toUpperCase();
    if (descripcion) {
      informacionPersonal.descripcion = descripcion;
    }
}

    if (req.files) {
      const img = req.files.archivo;

      //Si viene la imagen la actualizo
      if (img) {
        if (informacionPersonal.img) {
          console.log(informacionPersonal.img);
          //Elimino la imagen antigua del servidor
          const nombreArray = informacionPersonal.img.split("/");
          const nombre = nombreArray[nombreArray.length - 1];
          const [public_id] = nombre.split(".");
          cloudinary.uploader.destroy(public_id);
        }

        //subo la imagen
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        informacionPersonal.img = secure_url;
      }
    }
   await  informacionPersonal.save();

   res.json({
    status: true,
    payload: {
       informacionPersonal,
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


const eliminarInformacionPersonal=async(req,res)=>{
try {
  const id = req.params.id;
  const informacionPersonal=await InformacionPersonal.findByIdAndDelete(id);
  if(!informacionPersonal){
    return  res.status(400).json({
      status: false,
      msj: "No existe ninguna registro con ese id ",
    });
  }

  if((informacionPersonal.img.length)>0){
    //Elimino la imagen antigua del servidor
    const nombreArray = informacionPersonal.img.split("/");
    const nombre = nombreArray[nombreArray.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
}

  res.json({
      status: true,
      payload: {
         informacionPersonal,
      },
    });
} catch (error) {
  res.status(500).json({
    status: false,
    msj: "Ocurrio un error comuniquese con el administrador",
  });
}

}


const eliminarImagenInformacionPersonal=async(req,res)=>{
  try {
    const id = req.params.id;
    const informacionPersonal=await InformacionPersonal.findById(id);
    if(!informacionPersonal){
      return  res.status(400).json({
        status: false,
        msj: "No existe ninguna registro con ese id ",
      });
    }
  
    if((informacionPersonal.img.length)>0){
      //Elimino la imagen antigua del servidor
      const nombreArray = informacionPersonal.img.split("/");
      const nombre = nombreArray[nombreArray.length - 1];
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id);
      informacionPersonal.img=""
  }

 await  informacionPersonal.save();
  
    res.json({
        status: true,
        payload: {
           informacionPersonal,
        },
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      msj: "Ocurrio un error comuniquese con el administrador",
    });
  }
  
  }

module.exports = {
   crearInformacionPersonal,
   obtenerInformacionPersonal,
   actualizarInformacionPersonal,
   eliminarInformacionPersonal,
   eliminarImagenInformacionPersonal,
   obtenerInformacionPersonales
};
