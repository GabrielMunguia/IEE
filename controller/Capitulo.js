const Capitulo = require("../models/Capitulo");
const cloudinary = require("cloudinary").v2;
const crearCapitulo = async (req, res = response) => {
    try {
  
      const {nombre}=req.body;
  
      const capitulo = new Capitulo({ nombre });
  
      if (req.files) {
        const img = req.files.archivo;
  
        //Si viene la imagen la actualizo
        if (img) {
          if (capitulo.img) {
            //Elimino la imagen antigua del servidor
            const nombreArray = capitulo.img.split("/");
            const nombre = nombreArray[nombreArray.length - 1];
            const [public_id] = nombre.split(".");
            cloudinary.uploader.destroy(public_id);
          }
  
          //subo la imagen
          const { tempFilePath } = req.files.archivo;
          const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
          capitulo.img = secure_url;
        }
      }
  
      await capitulo.save();
  
      res.json({
        status: true,
        payload: {
          capitulo
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

    const obtenerCapitulos = async (req, res) => {
        try {
            const capitulos = await Capitulo.find();

            res.json({
                status: true,
                payload: {
                    capitulos,
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

    const actualizarCapitulo = async (req, res) => {
        try {
            const id = req.params.id;
            const capitulo = await Capitulo.findById(id);
        
            if(!capitulo){
              return  res.status(400).json({
                status: false,
                msj: "No existe ninguna capitulo con ese id ",
              });
            }
        
           
        
          
          
        if(req.body.nombre){
          const nombre = req.body.nombre.toUpperCase();
        
          if (nombre) {
            capitulo.nombre = nombre;
          }
        }
        
        
            if (req.files) {
              const img = req.files.archivo;
        
              //Si viene la imagen la actualizo
              if (img) {
                if (capitulo.img) {
                  console.log(capitulo.img);
                  //Elimino la imagen antigua del servidor
                  const nombreArray = capitulo.img.split("/");
                  const nombre = nombreArray[nombreArray.length - 1];
                  const [public_id] = nombre.split(".");
                  cloudinary.uploader.destroy(public_id);
                }
                console.log(` la capitulo se borro ${capitulo.img}`)
        
                //subo la imagen
                const { tempFilePath } = req.files.archivo;
                const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
                capitulo.img = secure_url;
              }
            }
           await  capitulo.save();
        
           res.json({
            status: true,
            payload: {
               capitulo,
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

    const eliminarCapitulo=async(req,res)=>{
        try {
          const id = req.params.id;
          const capitulo=await Capitulo.findById(id);
          if(!capitulo){
            return  res.status(400).json({
              status: false,
              msj: "No existe ningun capitulo con ese id ",
            });
          }
        
          if((capitulo.img.length)>0){
               //Elimino la imagen antigua del servidor
               const nombreArray = capitulo.img.split("/");
               const nombre = nombreArray[nombreArray.length - 1];
               const [public_id] = nombre.split(".");
               cloudinary.uploader.destroy(public_id);
          }
            await capitulo.remove();
        
          res.json({
              status: true,
              payload: {
                 capitulo,
              },
            });
        } catch (error) {
          res.status(500).json({
            status: false,
            msj: "Ocurrio un error comuniquese con el administrador",
            error: error.message
          });
        }
        
        }
        




  module.exports = {
    crearCapitulo,
    obtenerCapitulos,
    actualizarCapitulo,
    eliminarCapitulo
    };
