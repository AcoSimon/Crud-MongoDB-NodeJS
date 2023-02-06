// Lib requeridas:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Models:
const user = require('../model/userModel');
//-------------------------------------------------------------------------------------------------------------------------
// Crea una función que reciba el nombre de la colección, el dato viejo y el nuevo dato
function updateDocument(collectionName, oldData, newData) {
  // Utiliza updateOne() para actualizar el primer documento que coincida con el filtro
  collectionName.updateOne(oldData, newData, function(error) {
    if (error) {
      console.log('updateDocument: Error al actualizar el documento.');
    } else {
      console.log('updateDocument: Documento actualizado correctamente.');
    }
  });
}

module.exports = {
    updateDocument: updateDocument
  };
//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Controller || updateData -> Operative    ]');