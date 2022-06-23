const {Schema,model}= require('mongoose');

const CaracteristicasSchema= Schema({
    
    titulo:{
        type:String,
        require:[true,'El titulo es obligatorio'],
        unique:true
    },
    descripcion:{
        type:String,
        require:[true,'La descripcion  es obligatorio']
    }
    ,img:{
       type:String,
       default:""
    }
})

CaracteristicasSchema.methods.toJSON = function () {
    const { __v, _id,...caracteristicas } = this.toObject();
    return {
      uid:_id,
        ...caracteristicas,
        
    };
  };

  module.exports=model('caracteristica',CaracteristicasSchema);