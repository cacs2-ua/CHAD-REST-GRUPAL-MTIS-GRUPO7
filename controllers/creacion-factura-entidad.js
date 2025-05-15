'use strict';

var utils = require('../utils/writer.js');
var FacturaService = require('../service/FacturaService');

/**
 * Método POST /facturas/crear
 */
module.exports.facturaEntidadCrear = function facturaEntidadCrear(req, res, next) {
  const body = req.body;
  const wSKey = req.headers['wskey']; // <- 🔥 Aquí se extrae bien la cabecera

  FacturaService.facturaEntidadCrear(body, wSKey)
    .then(function (response) {
      utils.writeJson(res, response, 201); // Código 201: creado
    })
    .catch(function (error) {
      const errorMsg = error.error || 'Error interno al crear la factura.';
      utils.writeJson(res, { error: errorMsg }, error.status || 500);
    });
};
