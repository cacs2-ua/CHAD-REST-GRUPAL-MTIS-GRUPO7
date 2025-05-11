'use strict';

var utils = require('../utils/writer.js');
var ConsultaDeFactura = require('../service/ConsultaDeFacturaService');

module.exports.consultaFactura = function consultaFactura (req, res, next, body, wSKey) {
  ConsultaDeFactura.consultaFactura(body, wSKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
