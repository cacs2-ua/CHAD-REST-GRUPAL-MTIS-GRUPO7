'use strict';

var utils = require('../utils/writer.js');
var AnulacionDeFactura = require('../service/AnulacionDeFacturaService');

module.exports.anulacionFactura = function anulacionFactura (req, res, next, body, wSKey) {
  AnulacionDeFactura.anulacionFactura(body, wSKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
