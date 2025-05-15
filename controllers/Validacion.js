'use strict';

var utils = require('../utils/writer.js');
var Validacion = require('../service/ValidacionService');

module.exports.fechas = function fechas (req, res, next, body, wSKey) {
  const wSKeyReal = req.get('WSKey');
  Validacion.fechas(body, wSKeyReal)
    .then(function (response) {
      utils.writeJson(res, response.mensaje,response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.mensaje,response.status);
    });
};

module.exports.validacionEmpresaExiste = function validacionEmpresaExiste (req, res, next, body, wSKey) {
  const wSKeyReal = req.get('WSKey');
  Validacion.validacionEmpresaExiste(body, wSKeyReal)
    .then(function (response) {
      utils.writeJson(res, response.mensaje,response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.mensaje,response.status);
    });
};

module.exports.validacionFacturaExiste = function validacionFacturaExiste (req, res, next, body, wSKey) {
  const wSKeyReal = req.get('WSKey');
  Validacion.validacionFacturaExiste(body, wSKeyReal)
    .then(function (response) {
      utils.writeJson(res, response.mensaje,response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.mensaje,response.status);
    });
};

