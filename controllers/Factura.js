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

module.exports.facturaEntidadCrear = async function facturaEntidadCrear(req, res, next) {
  const body = req.body;
  const wSKey = req.headers['wskey'];

  try {
    const response = await Factura.facturaEntidadCrear(body, wSKey);
    utils.writeJson(res, response);
  } catch (error) {
    utils.writeJson(res, error);
  }
};



module.exports.facturaEntidadModificarEstado = async function facturaEntidadModificarEstado(req, res, next) {
  const body = req.body;
  const wSKey = req.headers['wskey']; // ← importante: tomar de cabecera

  try {
    const response = await Factura.facturaEntidadModificarEstado(body, wSKey);
    utils.writeJson(res, response);
  } catch (error) {
    utils.writeJson(res, error);
  }
};
