const {Schema,model}=require('mongoose');

const proyectoImageneSchema = Schema({
    img:{
        type:String,
        required:[true,'La imagen es obligatoria']
    },
    idProyecto:{
        type:Schema.Types.ObjectID,
        ref:'Proyecto',
        required:[true,'El id del proyecto es obligatorio']
    }

})

proyectoImageneSchema.methods.toJSON = function () {
    const { __v, _id,...proyecto } = this.toObject();
    return {
      uid:_id,
        ...proyecto,
        
    };
  };

module.exports=model('proyectoImagene',proyectoImageneSchema)