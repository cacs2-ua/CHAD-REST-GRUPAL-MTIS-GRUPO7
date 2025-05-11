'use strict';

var utils = require('../utils/writer.js');
var Validacion = require('../service/ValidacionService');

module.exports.fechas = function fechas (req, res, next, body, wSKey) {
  Validacion.fechas(body, wSKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.validacionEmpresaExiste = function validacionEmpresaExiste (req, res, next, body, wSKey) {
  Validacion.validacionEmpresaExiste(body, wSKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.validacionFacturaExiste = function validacionFacturaExiste (req, res, next, body, wSKey) {
  Validacion.validacionFacturaExiste(body, wSKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

