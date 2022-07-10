const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  usuario: {
    type: String,
    required: [true, "El usuario es obligatorio"],
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
  voluntario: {
    type: Schema.Types.ObjectId,
    ref: 'Voluntario',
    required: [true, "El voluntario es obligatorio"],
}
});

usuarioSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  return {
    uid:_id,
      ...user,

  
     
   
      
  };
};

module.exports = model("Usuario", usuarioSchema);
