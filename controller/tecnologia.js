const { response } = require("express");
const Tecnologia = require("../models/tecnologia");
const cloudinary = require("cloudinary").v2;


const crearTecnologia = async (req, res = response) => {
  try {

    const titulo = req.body.titulo.toUpperCase();

    const tecnologia = new Tecnologia({ titulo });

    if (req.files) {
      const img = req.files.archivo;

      //Si viene la imagen la actualizo
      if (img) {
        if (tecnologia.img) {
          //Elimino la imagen antigua del servidor
          const nombreArray = tecnologia.img.split("/");
          const nombre = nombreArray[nombreArray.length - 1];
          const [public_id] = nombre.split(".");
          cloudinary.uploader.destroy(public_id);
        }

        //subo la imagen
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        tecnologia.img = secure_url;
      }
    }

    await tecnologia.save();

    res.json({
      status: true,
      payload: {
        tecnologia
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

const obtenerTecnologias = async (req, res) => {
  try {
    const tecnologias = await Tecnologia.find();

    res.json({
      status: true,
      payload: {
         tecnologias,
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



const obtenerTecnologia = async (req, res) => {
  try {

    const id = req.params.id;
    const tecnologia = await Tecnologia.findById(id);
    if(!tecnologia){
      return  res.status(400).json({
        status: false,
        msj: "No existe ninguna tecnologia con ese id ",
      });
    }
    res.json({
      status: true,
      payload: {
         tecnologia,
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

const actualizarTecnologia = async (req, res) => {
  try {
    const id = req.params.id;
    const tecnologia = await Tecnologia.findById(id);

    if(!tecnologia){
      return  res.status(400).json({
        status: false,
        msj: "No existe ninguna tecnologia con ese id ",
      });
    }

   

  
  
if(req.body.titulo){
  const titulo = req.body.titulo.toUpperCase();

  if (titulo) {
    tecnologia.titulo = titulo;
  }
}


    if (req.files) {
      const img = req.files.archivo;

      //Si viene la imagen la actualizo
      if (img) {
        if (tecnologia.img) {
          console.log(tecnologia.img);
          //Elimino la imagen antigua del servidor
          const nombreArray = tecnologia.img.split("/");
          const nombre = nombreArray[nombreArray.length - 1];
          const [public_id] = nombre.split(".");
          cloudinary.uploader.destroy(public_id);
        }
        console.log(` la tecnologia se borro ${tecnologia.img}`)

        //subo la imagen
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        tecnologia.img = secure_url;
      }
    }
   await  tecnologia.save();

   res.json({
    status: true,
    payload: {
       tecnologia,
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


const eliminarTecnologia=async(req,res)=>{
try {
  const id = req.params.id;
  const tecnologia=await Tecnologia.findByIdAndDelete(id);
  if(!tecnologia){
    return  res.status(400).json({
      status: false,
      msj: "No existe ninguna tecnologia con ese id ",
    });
  }

  if((tecnologia.img.length)>0){
       //Elimino la imagen antigua del servidor
       const nombreArray = tecnologia.img.split("/");
       const nombre = nombreArray[nombreArray.length - 1];
       const [public_id] = nombre.split(".");
       cloudinary.uploader.destroy(public_id);
  }

  res.json({
      status: true,
      payload: {
         tecnologia,
      },
    });
} catch (error) {
  res.status(500).json({
    status: false,
    msj: "Ocurrio un error comuniquese con el administrador",
  });
}

}




const eliminarImagenTecnologia=async(req,res)=>{
  try {
    const id = req.params.id;
    const tecnologia=await Tecnologia.findById(id);
    if(!tecnologia){
      return  res.status(400).json({
        status: false,
        msj: "No existe ninguna tecnologia con ese id ",
      });
    }
  
    if((tecnologia.img.length)>0){
         //Elimino la imagen antigua del servidor
         const nombreArray = tecnologia.img.split("/");
         const nombre = nombreArray[nombreArray.length - 1];
         const [public_id] = nombre.split(".");
         cloudinary.uploader.destroy(public_id);
         tecnologia.img="";
    }
   await  tecnologia.save();
  
    res.json({
        status: true,
        payload: {
           tecnologia,
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
   crearTecnologia,
   obtenerTecnologias,
   actualizarTecnologia,
   eliminarTecnologia,
   eliminarImagenTecnologia,
   obtenerTecnologia
};
