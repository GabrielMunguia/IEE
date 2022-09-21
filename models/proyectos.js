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
    img:{
        type:String,
        default:""
    },
    fecha:{
        type:Date, 
        
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