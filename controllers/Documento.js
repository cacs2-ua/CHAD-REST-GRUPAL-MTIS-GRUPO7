'use strict';

var utils = require('../utils/writer.js');
var Documento = require('../service/DocumentoService');

module.exports.documentoUtilityExportarFacturaPDF = function documentoUtilityExportarFacturaPDF (req, res, next, numeroFactura, emailEmpresa) {
  const wSKeyReal =req.get('WSKey');
  const emailEmpresaDeco = decodeURIComponent(emailEmpresa);
  Documento.documentoUtilityExportarFacturaPDF(wSKeyReal, numeroFactura, emailEmpresaDeco)
    .then(function (response) {
      utils.writeJson(res, response.mensaje, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.mensaje, response.status);
    });
};

module.exports.documentoUtilityExportarFacturaXML = function documentoUtilityExportarFacturaXML (req, res, next, numeroFactura, emailEmpresa) {
  const wSKeyReal =req.get('WSKey');
  const emailEmpresaDeco = decodeURIComponent(emailEmpresa);
  Documento.documentoUtilityExportarFacturaXML(wSKeyReal, numeroFactura, emailEmpresaDeco)
    .then(function (response) {
      utils.writeJson(res, response.mensaje, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.mensaje, response.status);
    });
};
