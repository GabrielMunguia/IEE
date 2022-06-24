//esta funcion valida si el correo es unico

const Voluntario = require("../models/Voluntario");
const validarCorreo = async (req, res, next) => {
    const { correo } = req.body;
    if (!correo) {
        return res.status(400).json({
        estado: false,
        mensaje: "El correo es obligatorio",
        });
    }
    if (correo.length > 0) {
        const existeCorreo = await Voluntario.findOne({ correo });
        if (existeCorreo) {
        return res.status(400).json({
            estado: false,
            mensaje: "El correo ya existe",
        });
        }
        next();
        return ;
    }
    res.status(400).json({
        estado: false,
        mensaje: "El correo es obligatorio",
    });
  
    }

    module.exports = {
        validarCorreo,
    };