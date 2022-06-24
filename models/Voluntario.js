const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const voluntarioSchema = new Schema({
    nombres: {
        type: String,
        required: true,
        
    },
    apellidos: {
        type: String,
        required: true,
      
    },
   
    genero: {
        type: String,
        enum: ['M', 'F'],
        required: true,
    },

    correo: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        unique: true,

       
       
    }
    ,
    grado: {
        type: Schema.Types.ObjectId,
        ref: 'Grado',
       
    }
    ,
   
    capitulo: {
        type: Schema.Types.ObjectId,
        ref: 'Capitulo',

    }
    ,
    noMiembro: {
        type: String,
        required: true,
        unique: true
    },
    linkedin: {
        type: String,
       
    },
    img: {
        type: String,
        default: ""
        
    }

});
module.exports = mongoose.model('Voluntario', voluntarioSchema);

