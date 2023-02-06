//-------------------------------------------------------------------------------------------------------------------------
// Constantes y requerimos las librerias.
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { 
    userCreate,
    userLogin
} = require('../controller/authController');
// Models:
const agenda = require('../models/agendaModel');
const clients = require('../models/clientModel');
const operation = require('../models/operationModel');
const service = require('../models/serviceModel');
const User = require('../models/userModels');
// Controller:
const setData = require('../controller/setData');
// Importar las funciones desde el archivo 'getCollection'
const getData = require('../controller/getCollection')
//-------------------------------------------------------------------------------------------------------------------------
//Esta ruta responde a /auth, logeado:
router.get('/', async (req, res) => {
    res.json({
        mensaje: 'Bienvenido '+req.session.usuario.nombre+' de '+process.env.mongoAtlasEntidad
    })
    res.redirect('index', { usuario: req.session.usuario });
});

router.get('/pages-login', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          console.error(err);
        } else {
            res.render('pages-login');
        }
      });
});

router.get('/pages-register', (req, res) => {
    res.render('pages-register')
});

router.get('/index', async (req, res) => {
    if (!req.session.token) {
        return res.redirect("pages-login")
    }
    if (req.session.token) {

        const [agenCount, cltsCount, opCount, servCount, usCount] = await Promise.all([
            agenda.countDocuments({}),
            clients.countDocuments({}),
            operation.countDocuments({}),
            service.countDocuments({}),
            User.countDocuments({})
        ]).catch(err => {
            console.error(err);
        });

        const usuario = req.session.usuario;
        res.render('index',{ usuario, agenCount, cltsCount, opCount, servCount, usCount });
    }
});

  


router.get('/users-profile', (req, res) => {
    if (!req.session.token) {
        return res.redirect("pages-login")
    }
    if (req.session.token) {
        const usuario = req.session.usuario;
        res.render('users-profile',{ usuario });
    }
});

router.get('/pages-agenda', (req, res) => {
    if (!req.session.token) {
        return res.redirect("pages-login");
    }
    if (req.session.token) {
        // Obtener los datos de la colección "agendas"
        agenda.find({}, (error, agendas) => {
            if (error) {
                return console.log(error);
            }
            // Renderizar la vista con los datos obtenidos
            res.render('pages-agenda', { agendas });
        });
    }
});


router.get('/setAgenda', (req, res) => {
    if (!req.session.token) {
        return res.redirect("pages-login")
        }
        if (req.session.token) {
            const usuario = req.session.usuario;
            res.render('setAgenda',{usuario})
        }
});

router.get('/pages-clients', (req, res) => {
    if (!req.session.token) {
        return res.redirect("pages-login");
    }
    if (req.session.token) {
        // Obtener los datos de la colección "clients"
        clients.find({}, (error, clients) => {
            if (error) {
                return console.log(error);
            }
            // Renderizar la vista con los datos obtenidos
            res.render('pages-clients', { clients });
        });
    }
});


router.get('/setClients', (req, res) => {
    if (!req.session.token) {
        return res.redirect("pages-login")
    }
        if (req.session.token) {
            res.render('setClients')
    }
});

router.get('/pages-operation', (req, res) => {
    if (!req.session.token) {
        return res.redirect("pages-login");
    }
    if (req.session.token) {
        // Obtener los datos de la colección "operations"
        operation.find({}, (error, operations) => {
            if (error) {
                return console.log(error);
            }
            // Renderizar la vista con los datos obtenidos
            res.render('pages-operation', { operations });
        });
    }
});


router.get('/setOperation', (req, res) => {
    if (!req.session.token) {
        return res.redirect("pages-login")
    }
        if (req.session.token) {
            const usuario = req.session.usuario;
            res.render('setOperation',{usuario})
    }
});

router.get('/pages-services', (req, res) => {
    if (!req.session.token) {
        return res.redirect("pages-login");
    }
    if (req.session.token) {
        // Obtener los datos de la colección "services"
        service.find({}, (error, services) => {
            if (error) {
                return console.log(error);
            }
            // Renderizar la vista con los datos obtenidos
            res.render('pages-services', { services });
        });
    }
});


router.get('/setServices', (req, res) => {
    if (!req.session.token) {
        return res.redirect("pages-login")
    }
        if (req.session.token) {
            res.render('setServices')
    }
});

//-------------------------------------------------------------------------------------------------------------------------
//Esta ruta responde a /auth, NO logeado:
router.get('/pages-faq', (req, res) => {
    res.render('pages-faq')
});

router.get('/pages-contact', (req, res) => {
    res.render('pages-contact')
});

router.get('*', (req, res) => {
    res.render('pages-error-404')
});

//-------------------------------------------------------------------------------------------------------------------------
// Formularios, POST:
// Registro, form de la pagina pages-register
router.post('/create', userCreate);

// login, form de la pagina pages-login
router.post('/login', [
    check('email').isEmail(),
    check('password').isLength({min:8})
], userLogin)

router.post('/agenda', (req, res)=>{
    const usuario = req.session.usuario;
    const empleadoForm = usuario.nombre+' '+usuario.apellido;
    const clienteForm = req.body.cliente;
    const estadoForm = req.body.estado;
    const fechaForm = req.body.fecha;
    const horaForm = req.body.hora;

    const newContact = new agenda({
        fecha: fechaForm,
        hora: horaForm,
        cliente: clienteForm,
        empleado: empleadoForm,
        estado: estadoForm
    });
    // Setear data en la coleccion agenda:
    setData.insertIntoCollection(newContact);
    res.redirect('index');
});

router.post('/clients', (req, res)=>{
    const nombreForm = req.body.nombre;
    const apellidoForm = req.body.apellido;
    const dniForm = req.body.dni;
    const cuilForm = req.body.cuil;
    const nacimientoForm = req.body.nacimiento;
    const celularForm = req.body.telefono;
    const emailForm = req.body.email;
    const domicilioForm = req.body.domicilio;
    const ciudadForm = req.body.ciudad;
    const paisForm = req.body.pais;

    const newClients = new clients({
        nombre: nombreForm,
          apellido: apellidoForm,
          dni: dniForm,
          cuil: cuilForm,
          nacimiento: nacimientoForm,
          telefono: celularForm,
          email: emailForm,
          domicilio: domicilioForm,
          ciudad: ciudadForm,
          pais: paisForm,  
          carga: new Date(),
          empresa: process.env.mongoAtlasEntidad
    });
    // Setear data en la coleccion clientes:
    setData.insertIntoCollection(newClients);
    res.redirect('index');
});

router.post('/operation', (req, res)=>{
    const usuario = req.session.usuario;
    const empleadoForm = usuario.nombre+' '+usuario.apellido;;
    const clienteForm = req.body.cliente;
    const servicioForm = req.body.servicio;
    const observacionForm = req.body.observacion;
    const fechaForm = req.body.fecha;
    const horaForm = req.body.hora;
    const valorBrutoForm = req.body.valorBruto;
    const valorNetoForm = req.body.valorNeto;
    const estadoForm = req.body.estado;

    const newOperation = new operation({
        empleado: empleadoForm,
        cliente: clienteForm,
        servicio: servicioForm,
        observacion: observacionForm,
        fecha: fechaForm,
        hora: horaForm,
        estado: estadoForm,
        valorBruto: valorBrutoForm,
        valorNeto: valorNetoForm
    });

    // Setear data en la coleccion clientes:
    setData.insertIntoCollection(newOperation);
    res.redirect('index');
});

router.post('/services', (req, res)=>{
    const nombreForm = req.body.nombre;
    const descripcionForm = req.body.descripcion;
    const comisionForm = req.body.comision;
    const especialForm = req.body.especial;
    const costoForm = req.body.costo;

    const newServices = new service({
        nombre: nombreForm,
        descripcion: descripcionForm,
        comision: comisionForm,
        especial: especialForm,
        costo: costoForm
    });
    
    // Setear data en la coleccion clientes:
    setData.insertIntoCollection(newServices);
    res.redirect('index');
});

router.post('/userMod', async (req, res) => {
    console.log(req.session.usuario);
    const phone = req.body.phone;
    const newPhone = req.body.newPhone;

    // Buscar un usuario con el número de teléfono especificado
    const user = await User.findOne({ telefono: phone });
    if (!user) {
        return res.redirect('pages-error-404');
    }

    // Actualizar el número de teléfono
    user.telefono = newPhone;
    await user.save();
    res.redirect('index');
});


module.exports = router;

//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Router     || auth -> Operative          ]');
