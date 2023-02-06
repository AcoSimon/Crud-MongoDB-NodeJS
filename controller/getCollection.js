// Lib requeridas:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Models:
const agenda = require('../models/agendaModel');
const clients = require('../models/clientModel');
const operation = require('../models/operationModel');
const service = require('../models/serviceModel');
const User = require('../models/userModels');
//-------------------------------------------------------------------------------------------------------------------------
/* 
  readCollection:
    model -> 
    Se lee la coleccion de DBMongo.
*/
async function readCollection(collection) {
  return new Promise((resolve, reject) => {
    collection.find()
      .then(documents => {
        resolve(documents);
      })
      .catch(error => {
        console.log(`No se pudo leer la colección ${collection.s.name}. Error: ${error}`);
        reject(error);
      });
  });
}


  module.exports = {
    readCollection: readCollection
  };

  //-------------------------------------------------------------------------------------------------------------------------
console.log('[ Controller || getCollection -> Operative ]');