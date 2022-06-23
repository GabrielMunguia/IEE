const {Schema,model}= require('mongoose');

const informacionPersonalSchema= Schema({
    
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

informacionPersonalSchema.methods.toJSON = function () {
    const { __v, _id,...informacionPersonal } = this.toObject();
    return {
      uid:_id,
        ...informacionPersonal,
        
    };
  };

  module.exports=model('informacionPersonal',informacionPersonalSchema);
