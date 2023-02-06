// Lib requeridas:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Models:
const user = require('../model/userModel');
//-------------------------------------------------------------------------------------------------------------------------
function deleteCollection(collectionName) {
/* 
  deleteCollection:
    model -> 
    Se elimina la coleccion de DBMongo.
*/
  collectionName.deleteMany({}, function(error) {
    if (error) {
      console.log('deleteCollection: Error a la hora de eliminar datos.');
    } else {
      console.log('deleteCollection: Coleccion eliminada.');
    }
  });
}

function deleteDocument(collectionName, collectionSchema, criteria) {
  const CollectionModel = mongoose.model(collectionName, collectionSchema);
  CollectionModel.deleteOne(criteria, function(error) {
    if (error) {
      console.log('deleteDocument: Error a la hora de eliminar datos.');
    } else {
      console.log('deleteDocument: Coleccion eliminada.');
    }
  });
}


module.exports = {
    deleteCollection: deleteCollection,
    deleteDocument: deleteDocument
  };


//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Controller || deleteData -> Operative    ]');