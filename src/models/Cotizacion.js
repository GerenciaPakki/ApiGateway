const { Schema, model } = require('mongoose');

const CotizacionSchema = Schema({    
    Origen: { 
        DocumentoRemitente: {
            type: Number
        },   
        CentroCostoRemitente: {
            type: Number
        },
        CodigoPais: {
            type: String
        },
        NombreCiudad: {
            type: String
        }     
    },
    Destino: {       
        CodigoPais: {
            type: String
        },
        NombreCiudad: {
            type: String
        }   
    },
    Envio: {
        Tipo: {
            type: String
        },
        Cantidad: {
            type: Number
        },
        CantidadPorUnidad: {
            type: Number
        },
        UnidadMedida: {
            type: String
        },
        Peso: {
            type: String
        },
        Largo: {
            type: String
        },
        Ancho: {
            type: String
        },
        Alto: {
            type: String
        },
        Moneda: {
            type: String
        },
        ValorDeclarado: {
            type: Number
        },
        Detalle: {
            type: String
        }
    },    
    Err: {
        Proveedor: {
            type: String
        },
        TipoError: {
            type: String
        },
        er: {}
    },
    Fecha: {
        type: String,
        default: () => DateTime.local().setZone('America/Bogota').toJSDate()
    },
}, { collection: 'Cotizacion' });

module.exports = model('Cotizacion', CotizacionSchema);