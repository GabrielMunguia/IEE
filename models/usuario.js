const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },

  img: {
    type: String,
  },
  
  estado: {
    type: Boolean,
    default: true,
  },
});

usuarioSchema.methods.toJSON = function () {
  const { __v, password, _id,...user } = this.toObject();
  return {
    uid:_id,
      ...user,
      
  };
};

module.exports = model("Usuario", usuarioSchema);
