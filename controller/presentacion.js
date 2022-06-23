const { response } = require("express");
const Presentacion = require("../models/Presentacion");

const obtenerPresentacion = async (req, res = response) => {
  try {
    const presentaciones = await Presentacion.findOne();

    res.json({
      status: true,
      payload: {
        presentacion: presentaciones,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      msj: "Ocurrio un error comuniquese con el administrador",
    });
  }
};

const actualizarPresentacion = async (req, res) => {

try {
  const {__id,...resto}=req.body;
  const data={
    ...resto
  }

  const id = req.params.id;
  
  const presentacion= await Presentacion.findByIdAndUpdate(id,data,{new:true}) ;

  if (!presentacion) {
   return  res.status(400).json({
      status: false,
      msj: "No existe ninguna presentacion con ese id",
    });
  }
   res.json({
    status: true,
    payload: {
      presentacion: presentacion,
    },
  });



} catch (error) {
  console.log(error)
  
  return res.status(500).json({
    status: false,
    error,
    msj: "Ocurrio un error comuniquese con el administrador",
  
  });
}


};







module.exports = { obtenerPresentacion, actualizarPresentacion };
