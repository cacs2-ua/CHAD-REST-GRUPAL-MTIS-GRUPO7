'use strict';

var utils = require('../utils/writer.js');
var Documento = require('../service/DocumentoService');

module.exports.documentoUtilityExportarFacturaPDF = function documentoUtilityExportarFacturaPDF (req, res, next, wSKey, numeroFactura, emailEmpresa) {
  Documento.documentoUtilityExportarFacturaPDF(wSKey, numeroFactura, emailEmpresa)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.documentoUtilityExportarFacturaXML = function documentoUtilityExportarFacturaXML (req, res, next, wSKey, numeroFactura, emailEmpresa) {
  Documento.documentoUtilityExportarFacturaXML(wSKey, numeroFactura, emailEmpresa)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
