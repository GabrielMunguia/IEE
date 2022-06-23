const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const capituloSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
        default: ""
        
    },

});
module.exports = mongoose.model('Capitulo', capituloSchema);
