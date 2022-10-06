const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CodigoRecuperacion = new Schema({
    codigo: {
        type: String,
        required: true,
        
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    vencimiento: {
        type: Date,
        required: true,
    },
   
});
module.exports = mongoose.model('CodigoRecuperacion', CodigoRecuperacion);