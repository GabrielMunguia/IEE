
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user:"juayua2011@gmail.com", // generated ethereal user
      pass: "tdilgpfudwaqxark", // generated ethereal password
    },
  });


  module.exports={transporter}
