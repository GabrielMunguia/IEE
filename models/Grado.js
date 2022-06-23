const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gradoSchema = new Schema({
    grado: {
        type: String,
        required: true,
        unique: true
    },
})
module.exports = mongoose.model('Grado', gradoSchema);