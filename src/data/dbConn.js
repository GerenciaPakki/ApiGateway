const mongoose = require('mongoose');
const config = require ('../../config')
// URL de conexión a tu base de datos MongoDB
const mongoURL = config.apps[0].dev.MONGO_URL // 'mongodb://localhost:27017/apiGateway';
const usr = config.apps[0].dev.MONGO_USR
const pwd = config.apps[0].dev.MONGO_PWD

// async function conn() {
//     try {        
//         console.log(usr,pwd);
//         const options = {auth: {user: usr,password: pwd}};
//         await mongoose.connect(mongoURL, usr === '' ? undefined : options);
//         return mongoose.connection;
//     } catch (error) {
//         console.error('Error en la función conn:', error);
//         throw new Error('Error conectando a la base de datos');
//     }
// }

async function conn() {
    try {
        const options = {
            auth: { username: usr, password: pwd },
            // authSource: 'admin', // Dependiendo de cómo esté configurada tu base de datos
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        };
        
        // Si no hay usuario, no necesitas opciones de autenticación
        await mongoose.connect(mongoURL, options);
        return mongoose.connection;
    } catch (error) {
        console.error('Error en la función conn:', error);
        throw new Error('Error conectando a la base de datos');
    }
}


// Exportar la conexión para usarla en otros módulos de tu aplicación
module.exports = conn;