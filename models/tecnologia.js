const {Schema,model}= require('mongoose');

const tecnologiasSchema= Schema({
    
    titulo:{
        type:String,
        require:[true,'El titulo es obligatorio'],
        unique:true
    },
    img:{
       type:String,
       default:""
    }
})

tecnologiasSchema.methods.toJSON = function () {
    const { __v, _id,...tecnologias } = this.toObject();
    return {
      uid:_id,
        ...tecnologias,
        
    };
  };

  module.exports=model('tecnologia',tecnologiasSchema);