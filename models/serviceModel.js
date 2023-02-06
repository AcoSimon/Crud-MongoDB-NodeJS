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
  descripcion: {
    type: String,
    required: true
  },
  comision: {
    type: Number,
    required: true
  },
  especial: {
    type: Number,
    required: true
  },
  costo: {
    type: Number,
    required: true
  }
});

// Nombre de la coleccion:
const nameCollection = 'service';

module.exports = mongoose.model(nameCollection, userSchema);
//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Model      || serviceModel -> Operative  ]');