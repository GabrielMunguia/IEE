const Proyecto = require("../models/proyectos");
const cloudinary = require("cloudinary").v2;
const ProyectoImagene = require("../models/proyectoImagene");
const ProyectoVideos = require("../models/proyectoVideos");

const crearProyecto = async (req, res) => {
    try {
      const { titulo, ...resto } = req.body;
  
      const tituloMayuscula = titulo.toUpperCase().trim();
      const datos = {
        titulo: tituloMayuscula,
        ...resto,
      };
  
      const proyecto = new Proyecto(datos);
      proyecto.save();
      res.json({
        status: true,
        payload: {
          proyecto,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        msj: "Ocurrio un error comuniquese con el administrador",
      });
    }
  };


const obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find();

    res.json({
      status: true,
      payload: {
        proyectos,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msj: "Ocurrio un error comuniquese con el administrador",
    });
  }
};

const obtenerProyecto = async (req, res) => {
  try {
    const id = req.params.id;

    const proyecto = await Proyecto.findById(id);
    if (!proyecto) {
        return res.status(400).json({
          status: false,
          msj: "No existe ninguna proyecto con ese id",
        });
      }
    res.json({
      status: true,
      payload: {
        proyecto,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msj: "Ocurrio un error comuniquese con el administrador",
    });
  }
};

const actualizarProyecto = async (req, res) => {
  try {
    const { titulo, _id, __v, ...resto } = req.body;
    const id = req.params.id;
   
    let data;
    if(titulo){
        const tituloMayuscula = titulo.toUpperCase();
         data = {
            titulo:tituloMayuscula,
            ...resto,
          };
    }else{

        data = {
        
            ...resto,
          };
    }

  

    const proyecto = await Proyecto.findByIdAndUpdate(id, data,{new:true});

    if (!proyecto) {
      return res.status(400).json({
        status: false,
        msj: "No existe ninguna proyecto con ese id",
      });
    }

    res.json({
      status: true,
      payload: {
        proyecto
      },
    });
  } catch (error) {

    console.log(error)
    return res.status(500).json({
      status: false,
      msj: "Ocurrio un error comuniquese con el administrador",
    });
  }
};


const eliminarProyecto=async (req,res)=>{ 
    try {

        const id = req.params.id;

        const proyecto =await  Proyecto.findByIdAndDelete(id);

        

      




        if (!proyecto) {
            return res.status(400).json({
              status: false,
              msj: "No existe ninguna proyecto con ese id",
            });
          }
          const imagenes=await  ProyectoImagene.find({idProyecto:proyecto._id});
          const videos = await ProyectoVideos.find({idProyecto:proyecto._id});

          if(imagenes.length >0){
            imagenes.forEach((imagen)=>{
              const nombreArray = imagen.img.split("/");
              const nombre = nombreArray[nombreArray.length - 1];
              const [public_id] = nombre.split(".");
              cloudinary.uploader.destroy(public_id);
    
            })
          }

          if(videos.length >0){
            videos.forEach(async (video)=>{
            await ProyectoVideos.findByIdAndDelete(video._id);
            })
          }
      
          res.json({
            status: true,
            payload: {
              proyecto,
              imagenes
            },
          });

        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            status: false,
            msj: "Ocurrio un error comuniquese con el administrador",
          });
    }
}



module.exports = {
  crearProyecto,
  obtenerProyectos,
  obtenerProyecto,
  actualizarProyecto,
  eliminarProyecto
};
