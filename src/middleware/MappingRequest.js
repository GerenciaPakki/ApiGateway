const xml2js = require('xml2js');
// const respuesta = require('../red/response')
const { Builder } = require('xml2js');
const apiData = require('../data/apiData')

function XMLToJson(data) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(data, (err, result) => {
            if (err) {
                reject(err); // Rechazar la promesa en caso de error
            } else {               
                resolve(result);
            }
        });
    });
}

function JsonToXML(data) {
    const builder = new Builder();
    const xml = builder.buildObject(data);
    return (xml);       
}

// Función para mapear y convertir JSON a XML
const mappingRequest = async (reqApiGateway) => {
    try {
        const dataBody = reqApiGateway.body;
        const data = await apiData.getApiData(reqApiGateway.params.apiName, reqApiGateway.params.path, reqApiGateway.method);

        if (data.length === 0) {
            throw new Error(`No se encontró configuración para ${req.params.apiName}, ${req.params.path}, ${req.method}`);
        }

        const resultado = await XMLToJson(data.length === 0 ? data.request : data[0].request);

        resultado.COTIZACIONES.ADMISION[0].TIPO_ENVIO[0] = dataBody.Envio.Tipo;
        resultado.COTIZACIONES.ADMISION[0].NUMERO_BULTOS[0] = dataBody.Envio.Cantidad;
        resultado.COTIZACIONES.ADMISION[0].KILOS[0] = dataBody.Envio.CantidadPorUnidad;
        resultado.COTIZACIONES.ADMISION[0].CLIENTE_REMITENTE[0] = dataBody.Origen.DocumentoRemitente;
        resultado.COTIZACIONES.ADMISION[0].CENTRO_REMITENTE[0] = dataBody.Origen.CentroCostoRemitente;
        resultado.COTIZACIONES.ADMISION[0].PAIS_REMITENTE[0] = dataBody.Origen.CodigoPais;
        resultado.COTIZACIONES.ADMISION[0].POBLACION_REMITENTE[0] = dataBody.Origen.NombreCiudad;
        resultado.COTIZACIONES.ADMISION[0].PAIS_DESTINATARIO[0] = dataBody.Destino.CodigoPais;
        resultado.COTIZACIONES.ADMISION[0].POBLACION_DESTINATARIO[0] = dataBody.Destino.NombreCiudad;
        resultado.COTIZACIONES.ADMISION[0].INCOTERM[0] = '';
        resultado.COTIZACIONES.ADMISION[0].CODIGO_SERVICIO[0] = '';
        resultado.COTIZACIONES.ADMISION[0].LARGO[0] = dataBody.Envio.Largo;
        resultado.COTIZACIONES.ADMISION[0].ANCHO[0] = dataBody.Envio.Ancho;
        resultado.COTIZACIONES.ADMISION[0].ALTO[0] = dataBody.Envio.Alto;
        resultado.COTIZACIONES.ADMISION[0].TIPO_MERCANCIA[0] = dataBody.Envio.Detalle;
        resultado.COTIZACIONES.ADMISION[0].CONTENEDOR_MERCANCIA[0] = dataBody.Envio.Detalle;
        resultado.COTIZACIONES.ADMISION[0].IMPORTE_VALOR_DECLARADO[0] = dataBody.Envio.ValorDeclarado;
        resultado.COTIZACIONES.ADMISION[0].TIPO_MONEDA[0] = dataBody.Envio.Moneda;

        return JsonToXML(resultado);

    } catch (error) {
        throw error; // Re-lanzar el error para manejarlo en el enrutador
    }
};

module.exports = {mappingRequest};