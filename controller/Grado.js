
const Grado = require("../models/Grado");


const agregarGrado=async (req, res)=> {
    try {
        const {grado}=req.body;
        const existeGrado=await Grado.findOne({grado});
        if(existeGrado){
            return res.status(400).json({
                status: false,
                msj: "El grado ya existe",
            });
        }
        const newGrado = new Grado({grado});
        await newGrado.save();
 
        res.json({
            estado: true,
            grado: newGrado
        });
        
    } catch (error) {
        res.status(500).json({
            estado: false,
            mensaje: "Ocurrio un error comuniquese con  el administrador",
            error: error.message

        })
    }
}

const obtenerGrados=async (req, res)=> {
    try {
        const grados=await Grado.find();
        res.json({
            status:true,
            payload:grados
        });
    } catch (error) {
        res.status(500).json({
            estado: false,
            mensaje: "Ocurrio un error comuniquese con  el administrador",
            error: error.message
        }
        )
    }
}

module.exports={
    agregarGrado,
    obtenerGrados
}