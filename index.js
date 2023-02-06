//-------------------------------------------------------------------------------------------------------------------------
// Constantes y requerimos las librerias.
const express = require('express');
const session = require("express-session");
require('dotenv').config();
//Config
require('./database/conexion');
/*//Models:
require('./models/agendaModel');
require('./models/clientModel');
require('./models/operationModel');
require('./models/serviceModel');
require('./models/userModels');
//Controllers:
require('./controller/authController');
require('./controller/deleteData');
require('./controller/getCollection');
require('./controller/setData');
require('./controller/updateData');
//Libs:*/
const cors = require('cors');
const path = require('path');
const hbs = require('hbs');
const app = express();
const PORT = process.env.PORT || 8888;
let entidad = process.env.mongoAtlasEntidad;
//-------------------------------------------------------------------------------------------------------------------------
// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'/views')));
app.use(express.static(path.join(__dirname,'/views/assets')));
app.use(express.static(path.join(__dirname,'/views/doc')));
app.use(express.static(path.join(__dirname,'/views/img')));
app.use(cors());
app.use(
    session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
    })
    );
//-------------------------------------------------------------------------------------------------------------------------
//Configuración de Handlebars
app.use(express.static(path.join(__dirname, 'views')));
hbs.registerPartials('views/partials', path.join(__dirname, 'views/partials'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use('/auth', require('./router/auth'));
//------------------------------------------------------------------------------------------------------------------------- 
// Render a login:
app.get('/', (req, res) =>{
    res.render('pages-login')
});
app.get('/', (req, res) =>{
    res.render('pages-register')
});
//-------------------------------------------------------------------------------------------------------------------------
// App en escucha por el puerto asignado:
app.listen(PORT, () =>{
    console.log('[ Main       || Index -> Operative         ]');  
});


