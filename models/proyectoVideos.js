const {Schema,model}=require('mongoose');

const proyectoVideosSchema = Schema({
    video:{
        type:String,
        required:[true,'El video  es obligatorio']
    },
    idProyecto:{
        type:Schema.Types.ObjectID,
        ref:'Proyecto',
        required:[true,'El id del proyecto es obligatorio']
    }

})

proyectoVideosSchema.methods.toJSON = function () {
    const { __v, _id,...proyecto } = this.toObject();
    return {
      uid:_id,
        ...proyecto,
        
    };
  };

module.exports=model('proyectoVideo',proyectoVideosSchema)