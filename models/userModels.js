//Es la configuración de la colección Users de la DB

//Importamos las librerías necesarias
const mongoose = require('mongoose'); 
const { Schema } = require('mongoose');

//-------------------------------------------------------------------------------------------------------------------------
// Esquema del modelo para registrar usuarios:
const userSchema = new mongoose.Schema({
    entidad: {
      type: String,
      required: true,
      default: process.env.mongoAtlasEntidad
    },
    cuit: {
      type: Number,
      required: true
    },
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
      required: true,
      unique: true
    },
    nacimiento: {
      type: String,
      required: true
    },
    telefono: {
      type: Number,
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
      required: true,
      default: 'Argentina'
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    privilegio: {
      type: Number,
      required: true,
      default: 1
    },
    timestamp: {
        type: Date, 
        default: new Date()
    }
  });

//Exportamos la configuración con la colección
module.exports = mongoose.model('users', userSchema);

//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Model      || userModels -> Operative    ]');