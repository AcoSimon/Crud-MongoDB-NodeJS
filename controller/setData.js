// Lib requeridas:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Models:
const agenda = require('../models/agendaModel');
const client = require('../models/clientModel');
const operation = require('../models/operationModel');
const service = require('../models/serviceModel');
const user = require('../models/userModels');
//-------------------------------------------------------------------------------------------------------------------------
/* 
  insertIntoCollection:
    model -> 
    Se añade elemento a DBMongo.
*/
function insertIntoCollection(data) {
  data.save((error) => {
    if (error) {
      console.log('insertIntoCollection: Error: '+error+' en carga de info');
    } else {
      console.log("insertIntoCollection: Exitosa fue la carga joven padawan.");
    }
  });
}

module.exports = {
  insertIntoCollection: insertIntoCollection
};

//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Controller || setData -> Operative       ]');