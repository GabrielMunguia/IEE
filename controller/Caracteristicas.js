const { response } = require("express");
const Caracteristica = require("../models/Caracteristicas");
const cloudinary = require("cloudinary").v2;




const crearCaracteristica = async (req, res = response) => {
  try {
    const descripcion = req.body.descripcion.toUpperCase();
    const titulo = req.body.titulo.toUpperCase();

    const caracteristica = new Caracteristica({ titulo, descripcion });

    if (req.files) {
      const img = req.files.archivo;

      //Si viene la imagen la actualizo
      if (img) {
        if (caracteristica.img) {
          console.log(caracteristica.img);
          //Elimino la imagen antigua del servidor
          const nombreArray = caracteristica.img.split("/");
          const nombre = nombreArray[nombreArray.length - 1];
          const [public_id] = nombre.split(".");
          cloudinary.uploader.destroy(public_id);
        }

        //subo la imagen
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        caracteristica.img = secure_url;
      }
    }

    await caracteristica.save();

    res.json({
      status: true,
      payload: {
        caracteristica,
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



const obtenerCaracteristicas = async (req, res) => {
  try {
    const caracteristicas = await Caracteristica.find();

    res.json({
      status: true,
      payload: {
        caracteristicas,
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



const obtenerCaracteristica = async (req, res) => {
  try {

    const id = req.params.id;
    const caracteristica = await Caracteristica.findById(id);
    if(!caracteristica){
      return  res.status(400).json({
        status: false,
        msj: "No existe ninguna caracteristica con ese id ",
      });
    }
    res.json({
      status: true,
      payload: {
        caracteristica,
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



const actualizarCaracteristica = async (req, res) => {
  try {
    const id = req.params.id;
    const caracteristica = await Caracteristica.findById(id);

    if(!caracteristica){
      return  res.status(400).json({
        status: false,
        msj: "No existe ninguna caracteristica con ese id ",
      });
    }

   
  
if(req.body.titulo){
  const titulo = req.body.titulo.toUpperCase();

  if (titulo) {
    caracteristica.titulo = titulo;
  }
}
if(req.body.descripcion){
  const descripcion = req.body.descripcion.toUpperCase();
    if (descripcion) {
      caracteristica.descripcion = descripcion;
    }
}

    if (req.files) {
      const img = req.files.archivo;

      //Si viene la imagen la actualizo
      if (img) {
        if (caracteristica.img) {
          console.log(caracteristica.img);
          //Elimino la imagen antigua del servidor
          const nombreArray = caracteristica.img.split("/");
          const nombre = nombreArray[nombreArray.length - 1];
          const [public_id] = nombre.split(".");
          cloudinary.uploader.destroy(public_id);
        }

        //subo la imagen
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
        caracteristica.img = secure_url;
      }
    }
   await  caracteristica.save();

   res.json({
    status: true,
    payload: {
      caracteristica,
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




const eliminarCaracteristica=async(req,res)=>{
try {
  const id = req.params.id;
  const caracteristica=await Caracteristica.findByIdAndDelete(id);
  if(!caracteristica){
    return  res.status(400).json({
      status: false,
      msj: "No existe ninguna caracteristica con ese id ",
    });
  }

  if((caracteristica.img.length)>0){
    //Elimino la imagen antigua del servidor
    const nombreArray = caracteristica.img.split("/");
    const nombre = nombreArray[nombreArray.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
}

  res.json({
      status: true,
      payload: {
        caracteristica,
      },
    });
} catch (error) {
  res.status(500).json({
    status: false,
    msj: "Ocurrio un error comuniquese con el administrador",
  });
}

}

const eliminarImagenCaracteristica=async(req,res)=>{
  try {
    const id = req.params.id;
    const caracteristica=await Caracteristica.findById(id);
    if(!caracteristica){
      return  res.status(400).json({
        status: false,
        msj: "No existe ninguna caracteristica con ese id ",
      });
    }
  
    if((caracteristica.img.length)>0){
      //Elimino la imagen antigua del servidor
      const nombreArray = caracteristica.img.split("/");
      const nombre = nombreArray[nombreArray.length - 1];
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id);
      caracteristica.img=""
  }
  await caracteristica.save();
  
    res.json({
        status: true,
        payload: {
          caracteristica,
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
  crearCaracteristica,
  obtenerCaracteristicas,
  actualizarCaracteristica,
  eliminarCaracteristica,
  obtenerCaracteristica,
  eliminarImagenCaracteristica
};
