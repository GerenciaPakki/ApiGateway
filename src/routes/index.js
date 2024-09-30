const express = require('express')
const router = express.Router()
const axios = require('axios')
const respuesta = require('../red/response')
const mustache = require('mustache');
const { getApiData } = require('../data/apiData')
const UtilityJSON = require('../middleware/UtilityJSON')

const dynamicTextMiddleware = (req, res, next) => {
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/xml')) {        
        req.format = 'application/xml';
        express.text({ type: 'application/xml' })(req, res, next);          
    } else if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {       
        req.format = 'application/json';
        express.text({ type: 'application/json' })(req, res, next);                
    } else {        
        req.format = 'text/plain';
        express.text()(req, res, next);            
    }
};
router.use(dynamicTextMiddleware);

// Ruta para el manejo de la solicitud
router.all('/:apiName/:path', async (req, res) => {
    try {       
        const data = getApiData(req.params.apiName, req.params.path, req.method);

        data.then((resultado) => {            
            if (resultado.length === 0) {
                throw new Error(`No se encontró configuración para ${req.params.apiName}, ${req.params.path}, ${req.method}`);
            }            

            const dataRequest = resultado.length == 0? resultado: resultado[0];
            const requestTercero = dataRequest.request;    
            const url = dataRequest.url;  
            const response_path = dataRequest.response_path;   
            const response_code = dataRequest.response_code;                          
            
            const reqBody = mustache.render(requestTercero, req.body);
            
            console.log('Body',reqBody)

            const headers = {};
            for (const [key, value] of Object.entries(dataRequest.header)) {
                headers[`${key}`] = `${value}`;                
            }
            
            const auth = {};    
            for (const [key, value] of Object.entries(dataRequest.autorizacion)) {
                auth[`${key}`] = `${value}`;
            }

            try {
                axios({method: req.method, url: url, headers: headers, auth: auth, data: reqBody})
                    .then(async response => {                                                        
                        const mensaje = UtilityJSON.getValueAtPath(response.data, response_path.split(','));
                        const codigo = UtilityJSON.getValueAtPath(mensaje, response_code.split(','));                                                               
                        respuesta.success(req, res, mensaje, 200, codigo)  
                })
                .catch(error => {
                    console.log('Respueta de error del servicio', error);
                    respuesta.error(error);
                    res.send(error)           
                });
            } catch (error) {   
                console.error('Error en la solicitud:', error);
                respuesta.error(req, res, error.message, 500)    
                // respuesta.error(req, res, error, error.response.status || 500)
            }
        }).catch((error) => {
            console.error('Error en la obtencion de la data:', error);
            respuesta.error(req, res, error.message, 500)
        });        
    } catch (error) {
        console.error('Error en el llamado al servicio:', error);
        respuesta.error(req, res, error, error.response.status || 500);
    }
});

module.exports = router