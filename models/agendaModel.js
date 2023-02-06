// Lib requeridas:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//-------------------------------------------------------------------------------------------------------------------------
// Esquema del modelo para registrar usuarios:
const userSchema = new mongoose.Schema({
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
  cliente: {
    type: String,
    required: true
  },
  empleado: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    required: true
  }
});

// Nombre de la coleccion:
const nameCollection = 'agenda';

module.exports = mongoose.model(nameCollection, userSchema);
//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Model      || agendaModel -> Operative   ]');