exports.success = function (req, res, mensaje = '', status = 200, codigo) {
    // Verificar si `mensaje` es una promesa y manejarlo adecuadamente
    if (mensaje instanceof Promise) {
        mensaje.then((msg) => {
            res.status(status).json({
                error: false,
                status: status,
                body: msg,
                code: codigo
            });
        }).catch((error) => {
            // console.error('Error al convertir XML a JSON:', error);
            res.status(500).json({
                error: true,
                status: 500,
                message: 'Error en la conversión de XML a JSON',
                code: codigo
            });
        });
    } else {
        // Si `mensaje` no es una promesa, verificar si es un objeto y enviarlo como JSON
        if (typeof mensaje === 'object') {
            res.status(status).json({
                error: false,
                status: status,
                body: mensaje,
                code: codigo
            });
        } else {
            // Si no es un objeto, enviarlo como está
            res.status(status).send({
                error: false,
                status: status,
                body: mensaje,
                codigo: codigo
            });
        }
    }
};

exports.error = function (req, res, mensaje = 'Error interno', status = 501) {    
    res.status(status).send({
        error: true,
        status: status,
        body: mensaje
    })
}