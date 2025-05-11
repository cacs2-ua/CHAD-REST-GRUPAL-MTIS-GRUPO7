/*
var ControllersUtils = require('./controllerUtils/controllerUtils');  // IMPORTAR controllerUtils/controllerUtils.js


module.exports.nuevoDispositivo = function nuevoDispositivo(req, res, next, body, wSKey) {
    const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");  // ESTA ES LA LINEA QUE IMPORTA.
  
    Dispositivos.nuevoDispositivo(body, keyFromRawHeaders) // Y aquí le pasas la WSKey al método de servicio
      .then(function(response) {
        const { salida, ...responseSinSalida } = response;
        res.set('salida', salida || 'Operación exitosa: dispositivo insertado correctamente');
        utils.writeJson(res, responseSinSalida, response.status || 201);
      })
      .catch(function(error) {
        res.set('salida', error.salida || (error.message || "Error interno del servidor"));
        utils.writeJson(res, { message: error.message || "Error interno del servidor" }, error.status || 404);
      });
  };
*/