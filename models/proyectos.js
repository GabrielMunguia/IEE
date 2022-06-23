const {Schema,model}= require('mongoose');

const proyectosSchema= Schema({
    
    titulo:{
        type:String,
        require:[true,'El titulo es obligatorio'],
        unique:true
    },

    subTitulo:{
        type:String,
        require:[true,'El sub titulo es obligatorio'],
    },
    descripcion:{
        type:String,
        require:[true,'La descripcion  es obligatorio']
    },
    sitio:{
        type:String,
        default:""
    },
    tecnologias:{
        type:String, 
        require:[true,'Las tecnologias son  obligatorio']
    },
    
})

proyectosSchema.methods.toJSON = function () {
    const { __v, _id,...proyecto } = this.toObject();
    return {
      uid:_id,
        ...proyecto,
        
    };
  };

  module.exports=model('Proyecto',proyectosSchema);