const mongoose = require('mongoose');
require ('dotenv').config();

//2. Pasamos la url local de la ubicacion de la db de mongo y la database
const MONGOLOCAL = process.env.MONGOLOCAL;
const MONGOATLAS = process.env.mongoAtlasInit+process.env.mongoAtlasEntidad+process.env.mongoAtlasEnd;
const entidad = process.env.mongoAtlasEntidad;
const PORT = process.env.PORT || 8888;
mongoose.set('strictQuery', true);

const conexion = mongoose.connect(MONGOATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () =>{
    console.log('--------------------------------------------\n- App conectada a MongoAtlas de "'+entidad+'".\n- App activa y trabajando en el puerto: '+PORT+'\n- Accede al sistema local desde:\n\n=> [[ http://localhost:'+PORT+'/ ]] <=\n');  
});

mongoose.connection.on('error', () =>{
    console.log(`Conexión a la Database NO encontrada - URL: ${MONGOATLAS}\n\n`);
})

module.exports = conexion;

//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Database   || conexion -> Operative      ]');
