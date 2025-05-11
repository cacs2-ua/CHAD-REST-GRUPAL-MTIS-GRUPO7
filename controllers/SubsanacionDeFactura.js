'use strict';

var utils = require('../utils/writer.js');
var SubsanacionDeFactura = require('../service/SubsanacionDeFacturaService');

module.exports.subsanacionFactura = function subsanacionFactura (req, res, next, body, wSKey) {
  SubsanacionDeFactura.subsanacionFactura(body, wSKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
