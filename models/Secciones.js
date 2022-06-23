const { Schema, model } = require("mongoose");

const SeccionSchema=Schema({
    nombre:{
        type:String,
        unique:true,
        require:[true,'El nombre es obligatorio']
    },
    status:{
        type:Boolean,
        default:true
    }
    
})

SeccionSchema.methods.toJSON = function () {
    const { __v,  _id,...seccion } = this.toObject();
    return {
      uid:_id,
        ...seccion,
        
    };
  };

module.exports=model('seccione',SeccionSchema)

