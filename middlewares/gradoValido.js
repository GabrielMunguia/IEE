const Grado = require("../models/Grado");

//esta funcion valida que el grado se encuentre en la base de datos
const gradoValido = async (req, res, next) => {
    const { grado } = req.body;
    if (!grado) {
        return res.status(400).json({
            status: false,
            msj: "El grado es obligatorio",
        });
    }
    const registroGrado = await Grado.findById( grado );
    console.log(registroGrado);

    if (!registroGrado){
        return res.status(400).json({
            status: false,
            msj: "El grado no existe",
        });
    }
    req.grado=registroGrado;
    next();
}
module.exports = {
    gradoValido,
}
