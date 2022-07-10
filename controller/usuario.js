const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-JWT");
const Usuario = require("../models/usuario");
const bcrypt =  require("bcryptjs");
const Voluntario = require("../models/Voluntario");
const cloudinary = require('cloudinary').v2;
const actualizarUsuario = async (req, res) => {

 try {
  const usuario =req.usuario;

  const { __id, password,newPassword ,nombre} = req.body;


  //Compruebo si el password coincide
  const  result = bcrypt.compareSync(password, usuario.password);
  //Si no coincide mando el siguiente mensaje
  if (!result) {
    return res.status(400).json({
      status:false,
      msj:"El password es invalido"
  });
  } 

 //Si  viene  un nuevo password actualizo el antiguo
  if (newPassword) {
    //Encriptar la contra
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(newPassword, salt);
  }

  //Si viene el nombre lo actualizo
  if(nombre){

    usuario.nombre=nombre;

  }



if(req.files){
  const img = req.files.archivo;

    //Si viene la imagen la actualizo
  if(img){
   


    if(usuario.img){
      console.log(usuario.img)
      //Elimino la imagen antigua del servidor
    const nombreArray= usuario.img.split('/');
    const nombre = nombreArray[nombreArray.length - 1];
    const [public_id]=nombre.split('.');
    cloudinary.uploader.destroy(public_id)
    }


    //subo la imagen
    const {tempFilePath}=req.files.archivo;
    const {secure_url}= await cloudinary.uploader.upload(tempFilePath)
    usuario.img = secure_url;




  }
}



  await usuario.save();

  

 

  res.json({
    status:true,
    payload:{
      usuario
    }
  
  });
 } catch (error) {
   console.log(error)
  res.status(500).json({
    msj:'Comuniquese con el administrador'
})
 }
};



const login =  async  (req,res=response)=>{
const {usuario,password}=req.body;
    try{
//Verificar si el usuario existe
const usuarioDB= await  Usuario.findOne({usuario}).populate('voluntario');

if(!usuarioDB){
return  res.status(400).json({
     msj:'Usuario/Contraseña no son correcto - Correo'
 })
 
}
console.log(usuarioDB)

//  Verificar si usuario esta activo

 if(usuarioDB.estado !== true){
    return  res.status(400).json({
         msj:'EL USUARIO NO ESTA ACTIVO'
     })
 }
 
 //Verificar password
 console.log('password',password)

 if(!bcryptjs.compareSync(password,usuarioDB.password)){
     return  res.status(400).json({
          msj:'Correo/Password no son correcto - Password Invalido'
      })
  }
// get Voluntario


 const token = await generarJWT(usuarioDB._id)
 console.log(token)


 res.json({
     usuario:usuarioDB,

    
     token
     
 })
    }catch(e){
      console.log(e)

        res.status(500).json({
            msj:'Comuniquese con el administrador'
        })

    }

}

//crear usuario
const crearUsuario = async (req, res) => {
  try {
    console.clear();
    const { usuario, password, nombre,voluntario } = req.body;
    //validar si exite un voluntario con ese id
    const voluntarioDB = await Voluntario.findById({_id:voluntario});
    if (!voluntarioDB) {
      return res.status(400).json({
        msj: "El voluntario no existe",
      });
    }
    //Verificar si el usuario existe
    const existeUsuario = await Usuario.findOne({ usuario });
    if (existeUsuario) {
      return res.status(400).json({
        status: false,
        msj: "El usuario ya existe"
      });
    }
    //Encriptar la contra
    const salt = bcryptjs.genSaltSync();
    const passwordEncriptado = bcryptjs.hashSync(password, salt);
    //Crear el usuario



    const usuarioDB = new Usuario({
      usuario,
      password: passwordEncriptado,
      nombre,
      estado:true,
      voluntario:voluntarioDB._id

    });

    if (req.files) {
      try {
       const img = req.files.archivo;

       if (img) {
         if (voluntario.img) {
           //Elimino la imagen antigua del servidor
           const nombreArray = voluntario.img.split("/");
           const nombre = nombreArray[nombreArray.length - 1];
           const [public_id] = nombre.split(".");
           cloudinary.uploader.destroy(public_id);
         }
         //subo la imagen
         const { tempFilePath } = req.files.archivo;
         const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
         usuario.img = secure_url;
        
       }
      } catch (error) {
       
      }
     }
    await usuarioDB.save();
    res.json({
      status: true,
      payload: {
        usuario: usuarioDB
      }
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    res.status(500).json({
      msj: "Comuniquese con el administrador"
    });
  }
}



module.exports = {
  actualizarUsuario,
  login,
  crearUsuario
};
