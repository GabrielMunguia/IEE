const Proyecto = require("../models/proyectos");
const cloudinary = require("cloudinary").v2;
const ProyectoImagene = require("../models/proyectoImagene");
const ProyectoVideos = require("../models/proyectoVideos");

const crearProyecto = async (req, res) => {
    try {
      console.log('crear')
      const { titulo, ...resto } = req.body;
      const img = req.files.archivo;
  
  
      const tituloMayuscula = titulo.toUpperCase().trim();
      const datos = {
        titulo: tituloMayuscula,
        ...resto,
      };

      if(img){
            //subo la imagen
      const { tempFilePath } = img;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
      datos.img = secure_url;
      }
  
      const proyecto = new Proyecto(datos);
      proyecto.save();
      res.json({
        status: true,
        msj: 'crado correctamente',
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
    console.log('queee Actualizar')
    const { titulo, _id, __v, ...resto } = req.body;
    const img = req.files?.archivo;
   

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

    if(img){
      const proyecto = await Proyecto.findById(id);
     if(proyecto.img.length>5){
      const nombreArray = proyecto.img.split("/");
      const nombre = nombreArray[nombreArray.length - 1];
      const [public_id] = nombre.split(".");
      cloudinary.uploader.destroy(public_id);

     }

     
 
      //subo la imagen
      const { tempFilePath } = img;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
      data.img = secure_url;


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
      msj: "Actualizado correctamente",
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

        //eliminar imagen de cloudinary
        const nombreArray = proyecto?.img.split("/");
        const nombre = nombreArray[nombreArray.length - 1];
        const [public_id] = nombre.split(".");
        cloudinary.uploader.destroy(public_id);

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
