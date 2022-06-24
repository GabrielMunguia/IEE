const Voluntario = require("../models/Voluntario");

const validarNoMiembro =async (req, res, next) => {
    const {noMiembro} = req.body;
    if (!noMiembro) {
         return res.status(400).json({
             estado: false,
             mensaje: "El numero de miembro es obligatorio",
         });
     }
        if (noMiembro.length > 0) {
            const existeNoMiembro = await Voluntario.findOne({ noMiembro });
            if (existeNoMiembro) {
                return res.status(400).json({
                    estado: false,
                    mensaje: "El numero de miembro ya existe",
                });
            }
            next();
            return ;
        }
        res.status(400).json({
            estado: false,
            mensaje: "El numero de miembro es obligatorio",
        });

}
module.exports = {
    validarNoMiembro,
}