const {Schema,model}= require('mongoose');

const PresentacionSchema=Schema({
    titulo:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },
    descripcion:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },


    
})

PresentacionSchema.methods.toJSON = function () {
    const { __v, password, _id,...presentacion } = this.toObject();
    return {
      uid:_id,
        ...presentacion,
        
    };
  };


module.exports=model('Presentacione',PresentacionSchema);

