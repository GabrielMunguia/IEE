const Capitulo = require("../models/Capitulo");

//este middleware valida que el capitulo que se quiere agregar  exista en la base de datos
const capituloValido = async (req, res, next) => {
 try {
    const { capitulo } = req.body;
    if (!capitulo) {
        return res.status(400).json({
            status: false,
            msj: "El capitulo es obligatorio",
        });
        }
        const id = capitulo;
  

    const registroCapitulo = await Capitulo.findById( id );
 

    if (!registroCapitulo){
        return res.status(400).json({
            status: false,
            msj: "El capitulo no existe",
        });
    }
    next();
 } catch (error) {

    res.status(500).json({
        status: false,
        msj: "Ocurrio un error comuniquese con el administrador",
    });
 }

}
module.exports = {
    capituloValido,
}