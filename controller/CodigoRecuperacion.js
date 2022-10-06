const { v4 } = require( 'uuid');
const  CodigosRecuperacion =require( '../models/CodigosRecuperacion');
const Usuario = require('../models/usuario');
const  Voluntario = require('../models/Voluntario');
const bcrypt =  require("bcryptjs");
const generarCodigoRecuperacion = async (req, res) => {
 try {
    const { correo } = req.body;

    const existeVoluntario = await Voluntario.findOne({ correo });
    if(!existeVoluntario){
      return res.status(400).json({
        status:false,
        msj:"El correo no existe"
      })
    }
    //validar si tiene una cuenta
    const existeUsuario = await Usuario.findOne({voluntario:existeVoluntario._id});
    if(!existeUsuario){
      return res.status(400).json({
        status:false,
        msj:"No hay ningun usuario asociado a este correo"
      })
    }

  //eliminar los codigos anteriores
  await CodigosRecuperacion.deleteMany({correo});

    //generaro el codigo de recuperacion
    const codigoRecuperacion = v4().substring(0, 5);

   const codigo =  new CodigosRecuperacion({
    vencimiento: Date.now() + 3600000,
      codigo:codigoRecuperacion,
      correo,

    });

    await codigo.save();
  


    if(!codigo){
      return res.status(400).json({
        status:false,
        msj:"No se pudo generar el codigo de recuperacion"
      })
    }

    res.json({
      status: true,
      payload: {
        codigo: codigoRecuperacion,
        codigo
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 300000));
   console.log('me ejecuto despues de 3 segundo');
    await CodigosRecuperacion.findOneAndDelete({_id:codigo._id}); 
   

  
 } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msj: "Ocurrio un error comuniquese con el administrador",
    });
    
 }
    
}



//actualizar password
const recuperarPassword=async(req,res)=>{
    try {
        const {correo,codigo,password}=req.body;
        console.log(correo,codigo,password);
        const existeCodigo = await CodigosRecuperacion.findOne({correo,codigo});
        console.log(existeCodigo);
        if(!existeCodigo){
            return res.status(400).json({
                status:false,
                msj:"El codigo no existe"
            })
        }
        if(existeCodigo.vencimiento<Date.now()){
            return res.status(400).json({
                status:false,
                msj:"El codigo ha expirado"
            })
        }
        const existeVoluntario = await Voluntario.findOne({correo});
        if(!existeVoluntario){
            return res.status(400).json({
                status:false,
                msj:"El correo no existe"
            })
        }
        const existeUsuario = await Usuario.findOne({voluntario:existeVoluntario._id});
        if(!existeUsuario){
            return res.status(400).json({
                status:false,
                msj:"No hay ningun usuario asociado a este correo"
            })
        }
        const salt = bcrypt.genSaltSync();
        existeUsuario.password = bcrypt.hashSync(password, salt);
        await existeUsuario.save();
        res.json({
            status:true,
            payload:{
                usuario:existeUsuario
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            msj: "Ocurrio un error comuniquese con el administrador",
          });
        
    }
}

module.exports = {
    generarCodigoRecuperacion,
    recuperarPassword
}