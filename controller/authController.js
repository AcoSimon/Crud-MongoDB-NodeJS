const Usuario = require('../models/userModels');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { generarToken } = require('../middelware/generarToken');

const userCreate = async (req, res) => {

    //1. Validamos los datos que llegan
    const errores = validationResult(req)
    
    if(!errores.isEmpty()){
        console.log(errores);
        return res.render('pages-error-404', {
            /* errores: errores */
            mensaje: 'Registro con Errores'
        })
    }

    //Probamos el post
    const { 
        cuit,
        domicilio,
        ciudad,
        pais,
        nombre,
        apellido,
        dni,
        nacimiento,
        telefono,
        email,
        password
     } = req.body;
    console.log(`
    1. ${cuit}, ${domicilio}, ${ciudad}, ${pais}, ${nombre}, ${apellido}, ${dni}, ${nacimiento}, ${telefono}, ${email}, ${password}`);

    //2. Verificamos si el email no se repite
    try {
        let usuario = await Usuario.findOne({ email })
        console.log(`2. ${usuario}`); 
        
        if(usuario){
            return res.render('pages-error-404', {
                mensaje: 'El usuario ya existe'
            })
        } 

    //3. Si el mail NO se repite, creamos al Usuario
        usuario = new Usuario(req.body);
        console.log(usuario); 

    //4. Generamos la encriptación del usuario
        const salt = bcrypt.genSaltSync();
        console.log(`La encriptación automática es ${salt}`);

    //5.Mezclamos la encriptación con el password
        usuario.password = bcrypt.hashSync(password, salt);
        console.log(`3. La mezcla es: ${usuario.password}`);

    //6. Guardamos el usuario en la database
        await usuario.save();

    //6. Creamos el Token de acceso al usuario
        const token = await generarToken(usuario);
        console.log(token);


        //. Respuesta de el POST
        res.redirect('/');

    //6. proximente token
        
    } catch (error) {
        console.log(error);
        return res.render('pages-error-404', {
            mensaje: 'Perdimos la Conexión!!!'
        })
    }    
}

const userLogin = async (req, res) => {

    console.log('=======================================\nuserLogin\n=======================================');  
    let validacion = 'Email o Contraseña incorrectos';

    //1. Recibimos los datos para el login
    const { email, password } = req.body;
    console.log(`1. Los datos ingresados son: ${email} - ${password}`);

    try {
    //2. Confirmar el email
        let usuario = await Usuario.findOne({ email });
        console.log(`2. Buscar: ${usuario}`);
        if(!usuario){
            return res.render('pages-error-404');
        }
    //3. Confirmamos la contraseña
        const validacionPassword = bcrypt.compareSync(password, usuario.password);
        console.log(`3. Validamos password: ${validacionPassword}`);

        if(!validacionPassword){
            alert('Contraseña incorrecta.')
        }
        const token = await generarToken(usuario);
        req.session.token = token;
        req.session.usuario = usuario;
        res.render('pages-contact', {
            token,
            usuario: `${usuario.nombre}`
        })
    } catch (error) {
        res.render('pages-error-404');
    }
    console.log('=======================================\nuserLogin\n=======================================');  
}

module.exports = {
    userCreate,
    userLogin,
}

//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Controller || authController -> Operative]');