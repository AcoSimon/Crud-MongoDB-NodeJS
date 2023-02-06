// Lib requeridas:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//-------------------------------------------------------------------------------------------------------------------------
// Esquema del modelo para registrar usuarios:
const userSchema = new mongoose.Schema({
  empleado: {
    type: String,
    required: true
  },
  cliente: {
    type: String,
    required: true
  },
  servicio: {
    type: String,
    required: true
  },
  observacion: {
    type: String,
    required: true
  },
  fecha: {
    type: String,
    required: true,
    default: new Date().getDate()+'/'+new Date().getMonth() + 1+'/'+new Date().getFullYear()
  },
  hora: {
    type: String,
    required: true,
    default: new Date().getHours()+':'+new Date().getMinutes()
  },
  estado: {
    type: Boolean,
    required: true
  },
  valorBruto: {
    type: Number,
    required: true
  },
  valorNeto: {
    type: Number,
    required: true
  }
});

// Nombre de la coleccion:
const nameCollection = 'operations';

module.exports = mongoose.model(nameCollection, userSchema);
//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Model      || operationModel -> Operative]');