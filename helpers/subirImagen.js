const cloudinary = require("cloudinary").v2;

const subirImagen=async (archivo,url)=>{
    
      try {
        const img = archivo;
  
        //Si viene la imagen la actualizo
      
          if (url) {
            console.log(url);
            //Elimino la imagen antigua del servidor
            const nombreArray = url.split("/");
            const nombre = nombreArray[nombreArray.length - 1];
            const [public_id] = nombre.split(".");
            cloudinary.uploader.destroy(public_id);
          }
  
          //subo la imagen
          const { tempFilePath } = archivo;
          const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
          return  secure_url;
        

     
      } catch (error) {
        
          throw new Error(error)
      }
     
}

module.exports={subirImagen}