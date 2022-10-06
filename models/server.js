const express = require("express");
const { dbConnection } = require("../db/connection");
const fileUpload = require("express-fileupload");
const cors = require('cors');
class Server {
    constructor(){
        this.app = express();
        this.port= process.env.PORT;
        this.paths={
            presentation:"/api/presentation/",
            proyects:"/api/proyects",
            about:"/api/about",
            personalInformation:"/api/personalInformation",
            users:"/api/usuarios/",
            sections:"/api/sections",
            technologies:"/api/technologies",
            imageProyect:"/api/img/proyect",
            videoProyect:"/api/video/proyect",
            email:'/api/email',
            grados:'/api/grados',
            capitulos:'/api/capitulos',
            voluntarios:'/api/voluntarios',
            recuperacion:'/api/recuperacion/password'


        }

        //Conectar Base de datos
        this.conectarDB();

        //middlewares
        this.middleware();

        //rutas

        this.routes()

    }

     async conectarDB(){
         await dbConnection(); 

    }

    middleware() {
         // Directorio publico
        this.app.use(express.static('public'))
        // CORS
        this.app.use(cors())
        // Lectura y parseo del body en JSON
        this.app.use(express.json())

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({useTempFiles: true, tempFileDir: '/tmp/', createParentPath: true}));
    }

    routes(){

        this.app.use(this.paths.presentation,require('../routes/presentacion'))

        this.app.use(this.paths.users,require('../routes/usuarios'))

        this.app.use(this.paths.sections,require('../routes/secciones'))

        this.app.use(this.paths.about,require('../routes/caracteristicas'))

        this.app.use(this.paths.technologies,require('../routes/tecnologias'))

        this.app.use(this.paths.personalInformation,require('../routes/informacionPersonal'))

        this.app.use(this.paths.proyects,require('../routes/proyectos'))

        this.app.use(this.paths.imageProyect,require('../routes/imagenProyecto'))

        this.app.use(this.paths.videoProyect,require('../routes/videosProyectos'))

        
        this.app.use(this.paths.email,require('../routes/correo'))

        this.app.use(this.paths.grados,require('../routes/grado'))

        this.app.use(this.paths.capitulos,require('../routes/capitulo'))

        this.app.use(this.paths.voluntarios,require('../routes/voluntario'));

        this.app.use(this.paths.recuperacion,require('../routes/codigoRecuperacion'));
        


        
        
    }

    listen() {
        this.app.listen(process.env.PORT || 5000, () => {
            console.log("localhost:", process.env.PORT);
        });
    }
}

module.exports = Server;