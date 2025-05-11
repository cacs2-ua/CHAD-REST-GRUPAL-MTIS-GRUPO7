'use strict';

var utils = require('../utils/writer.js');
var Factura = require('../service/FacturaService');

module.exports.facturaEntidadConsultar = function facturaEntidadConsultar (req, res, next, wSKey, numeroFactura, emailEmpresa) {
  Factura.facturaEntidadConsultar(wSKey, numeroFactura, emailEmpresa)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.facturaEntidadConsultarEstado = function facturaEntidadConsultarEstado (req, res, next, wSKey, numeroFactura, emailEmpresa) {
  Factura.facturaEntidadConsultarEstado(wSKey, numeroFactura, emailEmpresa)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
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
