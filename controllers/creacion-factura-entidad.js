'use strict';

var utils = require('../utils/writer.js');
var FacturaService = require('../service/FacturaService');

/**
 * Método POST /facturas/crear
 */
module.exports.facturaEntidadCrear = function facturaEntidadCrear(req, res, next, body, WSKey) {
  FacturaService.facturaEntidadCrear(body, WSKey)
    .then(function (response) {
      utils.writeJson(res, response, 201); // Código 201: creado
    })
    .catch(function (error) {
      const errorMsg = error.error || 'Error interno al crear la factura.';
      utils.writeJson(res, { error: errorMsg }, 500);
    });
};
