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

// async function conn() {
//     try {
//         const options = {
//             auth: { username: usr, password: pwd },
//             // authSource: 'admin', // Dependiendo de cómo esté configurada tu base de datos
//             // useNewUrlParser: true,
//             // useUnifiedTopology: true
//         };
        
//         // Si no hay usuario, no necesitas opciones de autenticación
//         await mongoose.connect(mongoURL, options);
//         return mongoose.connection;
//     } catch (error) {
//         console.error('Error en la función conn:', error);
//         throw new Error('Error conectando a la base de datos');
//     }
// }

const conn = async() => {
   
    try {
        // const uri = "mongodb+srv://dev_pakki:T3cn0l0g14*@atlascluster.3v6nhtw.mongodb.net/devpakkiDB";
        const uri = `${mongoURL}`;
        // process.env.DB_CNN
        mongoose.set("strictQuery", false);        
        // Agregar las opciones de autenticación con el usuario y contraseña
        const options = {
        auth: {
            username: `${usr}`,
            password: `${pwd}`
        }
        };
    
        console.log(uri);
        console.log(options);

        await mongoose.connect(uri, options);
        // console.log('Connection DB');
        
    } catch (error) {
        console.log(error);
        throw new Error('error connecting to database');
        
    }

};


// Exportar la conexión para usarla en otros módulos de tu aplicación
module.exports = conn;