const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const apiConfigSchema =  Schema({
    proveedor : String,
    nombre: String,
    metodo: String,
    url: String,
    header: {
        'Content-Type': String,        
    },
    token: String,
    autorizacion: {
        username: String,
        password: String
    },
    request: String,
    response_path: String,  
    response_code: String,
}, { collection: 'apiConfig' });

const ApiConfig = mongoose.model('apiConfig', apiConfigSchema);

module.exports = ApiConfig;