const Voluntario = require("../models/Voluntario");

const validarTelefono =async  (req, res, next) => {
    const { telefono } = req.body;
    const {id=""} = req.params;
    if (!telefono) {
       return next();
    }
    if (telefono.length > 0) {
       ///ver si es unico en la base de datos
       const existeTelefono = await Voluntario.findOne({ telefono });
      
         
         if (existeTelefono && id !== existeTelefono._id) {
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