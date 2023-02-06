// Lib requeridas:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//-------------------------------------------------------------------------------------------------------------------------
// Esquema del modelo para registrar usuarios:
const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  dni: {
    type: Number,
    required: true
  },
  cuil: {
    type: Number,
    required: true
  },
  nacimiento: {
    type: String,
    required: true
  },
  telefono: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  domicilio: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  pais: {
    type: String,
    required: true
  },  
  carga: {
    type: String,
    required: true,
    default: new Date()
  },
  empresa: {
    type: String,
    required: true,
    default: process.env.mongoAtlasEntidad
  }
});

// Nombre de la coleccion:
const nameCollection = 'clients';

module.exports = mongoose.model(nameCollection, userSchema);
//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Model      || clientModel -> Operative   ]');