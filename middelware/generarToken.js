const jwt = require('jsonwebtoken');
const PRIVATE_KEY = 'myprivatekey';

const generarToken = (user) => {

    return new Promise((resolve, reject) => {
        jwt.sign(
            {user},
            PRIVATE_KEY,
            { expiresIn: '1h'},
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('Error generando el Token')
                }
                resolve(token)
            }
        );
    })

}

module.exports = {
    generarToken
}

//-------------------------------------------------------------------------------------------------------------------------
console.log('[ Middleware || generarToken -> Operative  ]');