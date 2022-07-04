const Voluntario = require("../models/Voluntario");

const validarTelefono =async  (req, res, next) => {
    const { telefono } = req.body;
    if (!telefono) {
       return next();
    }
    if (telefono.length > 0) {
       ///ver si es unico en la base de datos
       const existeTelefono = await Voluntario.findOne({ telefono });
      
         
         if (existeTelefono) {
            return res.status(400).json({
                mensaje: "El telefono ya existe",
            });
            }
            next();
            return ;
    }
    
    res.status(400).json({
        estado: false,
        mensaje: "El telefono es obligatorio",
    });
    }

    module.exports = {
        validarTelefono,
    };