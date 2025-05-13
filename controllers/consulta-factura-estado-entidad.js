'use strict';

var utils = require('../utils/writer.js');
var Factura = require('../service/FacturaService');
var ControllersUtils = require('./controllerUtils/controllerUtils');

module.exports.facturaEntidadConsultar = function facturaEntidadConsultar (req, res, next, numeroFactura, emailEmpresa) {
    const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");
    Factura.facturaEntidadConsultar(keyFromRawHeaders, numeroFactura, emailEmpresa)
        .then(function (response) {
        utils.writeJson(res, response);
        })
        .catch(function (error) {
        const status = error.status || 500;
        const payload = { error: error.error || 'Error interno del servidor' };
        utils.writeJson(res, utils.respondWithCode(status, payload));
        });
};

module.exports.facturaEntidadConsultarEstado = function facturaEntidadConsultarEstado(req, res, next, numeroFactura, emailEmpresa) {
    // Extraer parámetros correctamente
    const keyFromRawHeaders = ControllersUtils.getHeaderFromRaw(req.rawHeaders, "wSKey");

    // Llamar a la función en el servicio
    Factura.facturaEntidadConsultarEstado(keyFromRawHeaders, numeroFactura, emailEmpresa)
        .then(function (response) {
        utils.writeJson(res, response); // Responder con el resultado
        })
        .catch(function (error) {
        const status = error.status || 500;
        const payload = { error: error.error || 'Error interno del servidor' };
        utils.writeJson(res, utils.respondWithCode(status, payload));
        });
};

module.exports.facturaEntidadCrear = function facturaEntidadCrear (req, res, next, body, wSKey) {
  Factura.facturaEntidadCrear(body, wSKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.facturaEntidadModificarEstado = function facturaEntidadModificarEstado (req, res, next, body, wSKey) {
  Factura.facturaEntidadModificarEstado(body, wSKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
