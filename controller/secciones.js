const { response } = require("express");
const { json } = require("express/lib/response");
const Secciones = require("../models/Secciones");

const obtenerSecciones = async (req, res = response) => {
  try {
    const secciones = await Secciones.find();

    res.json({
      status: true,
      payload: {
        secciones,
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

const obtenerSeccion = async (req, res = response) => {
  try {

    const id = req.params.id;
    const seccion = await Secciones.findById(id);

    res.json({
      status: true,
      payload: {
        seccion,
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

const crearSeccion = async (req, res = response) => {
  try {
    const  nombre  = req.body.nombre.toUpperCase();
    const seccion = new Secciones({ nombre });
    await seccion.save();
    res.json({
      status: true,
      payload: {
        seccion,
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


const actualizarSeccion = async (req, res = response) => {
  try {

    const id=req.params.id;
  
    const {nombre,...resto}=req.body;
     let data;
    if(nombre){
      const nombreMayuscula= nombre.toUpperCase();
     data={
      nombre:nombreMayuscula,
      ...resto
    }
    }else{
      data={
        ...resto
      }
    }

    
   
    const seccion = await Secciones.findByIdAndUpdate(id,data,{new:true})
   
    res.json({
      status: true,
      payload: {
        seccion,
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

const eliminarSeccion=async (req,res)=>{
  const id= req.params.id;

  const seccion = await Secciones.findByIdAndDelete(id);
  if(!seccion){
  return   res.status(400).json({
      status:false,
      msj:"No existe ninguna seccion con ese id "
    })
  }



  res.json({
    status:true,
    seccion
  })
  
}



module.exports = {
  obtenerSecciones,
  crearSeccion,
  actualizarSeccion,
  eliminarSeccion,
  obtenerSeccion
};
