'use strict';

var utils = require('../utils/writer.js');
var EmisionDeFactura = require('../service/EmisionDeFacturaService');

module.exports.emisionFactura = function emisionFactura (req, res, next, body, wSKey) {
  EmisionDeFactura.emisionFactura(body, wSKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
