const { transporter } = require("../config/email")




const enviarCorreo=async (req,res)=>{
try {
      // send mail with defined transport object

 const{correo,mensaje,nombre}=req.body;

 const mensajeCompleto=`
 Nombre de quien envia  : ${nombre},
 Correo de quien envia : ${correo},
 Mensaje de quien envia : ${mensaje}
 
 `




 // create reusable transporter object using the default SMTP transport
 
   // send mail with defined transport object
   let info = await transporter.sendMail({
       from: `"CONTACTO DESDE PORTAFOLIO " <juayua2011@gmail.com>`, // sender address
       to:"juayua2011@gmail.com,rodrigo.alejandro.65@gmail.com", // list of receivers
       subject: "🌐🌐🌐-CONTACTO DESDE  PAGINA IEEE --🌐🌐🌐", // Subject line
       text: mensajeCompleto, // plain text body
  
     });


     res.json({
        status: true,
        payload: {
         msj:"Correo enviado con exito"
        },
      });
} catch (error) {
    console.log(error)
    res.status(500).json({
        msj:'Comuniquese con el administrador'
    })
}

}


module.exports ={enviarCorreo}