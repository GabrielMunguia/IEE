const Caracteristicas = require("../models/Caracteristicas");
const informacionPersonal = require("../models/informacionPersonal");
const Secciones = require("../models/Secciones");
const Tecnologia = require("../models/tecnologia");

const Proyecto = require("../models/proyectos");

const existeSeccion = async (nombre = "") => {
  nombre = nombre.toUpperCase();
  const seccion = await Secciones.findOne({ nombre });
  console.log(seccion);
  if (seccion) {
    throw new Error(`Ya existe una  seccion con ese nombre : ${nombre}`);
  }

  return true;
};

const existeTecnologia = async (titulo = "") => {
  titulo = titulo.toUpperCase();
  const tecnologia = await Tecnologia.findOne({ titulo: titulo });

  if (tecnologia) {
    throw new Error(`Ya existe una  tecnologia con ese nombre : ${titulo}`);
  }

  return true;
};

const existeCaracteristica = async (titulo = "") => {
  titulo = titulo.toUpperCase();
  const tecnologia = await Caracteristicas.findOne({ titulo: titulo });

  if (tecnologia) {
    throw new Error(`Ya existe una  caracteristica con ese nombre : ${titulo}`);
  }

  return true;
};

const existeInformacionPersonal = async (titulo = "") => {
  titulo = titulo.toUpperCase();
  const tecnologia = await informacionPersonal.findOne({ titulo: titulo });

  if (tecnologia) {
    throw new Error(`Ya existe una  tecnologia con ese nombre : ${titulo}`);
  }

  return true;
};


const existeProyecto = async (titulo = "") => {
  titulo = titulo.toUpperCase();
  const proyecto = await Proyecto.findOne({ titulo: titulo });

  if (proyecto) {
    throw new Error(`Ya existe un  proyecto con ese nombre : ${titulo}`);
  }

  return true;
};

module.exports = {
  existeSeccion,
  existeTecnologia,
  existeCaracteristica,
  existeInformacionPersonal,
  existeProyecto
};
