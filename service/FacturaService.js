'use strict';


/**
 * Método asociado al servicio de entidad 'Factura'. Este método contiene lógica reutilizable y genérica para poder consultar la estructura completa de una factura.
 *
 * wSKey String Clave de autenticación WSKey
 * numeroFactura String Número identificativo de la factura que se quiere consultar
 * emailEmpresa String Email de la empresa
 * returns FacturaConsulta
 **/
exports.facturaEntidadConsultar = function(wSKey,numeroFactura,emailEmpresa) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "numeroFactura" : "FAC-178965412674769490",
  "baseImponible" : 1250.75,
  "iva" : 0.21,
  "moneda" : "EURO",
  "tipo" : "ORDINARIA",
  "estado" : "VALIDA",
  "esSubsanable" : true,
  "haSidoSubsanada" : true,
  "fechaRectificacion" : "2025-05-10T14:30:45",
  "fechaEmision" : "2025-05-01T11:45:56",
  "fechaDesdeFacturacion" : "2025-04-01",
  "fechaHastaFacturacion" : "2025-05-01"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Método asociado al servicio de entidad 'Factura'. Este método contiene lógica reutilizable y genérica para poder consultar el estado de una factura.
 *
 * wSKey String Clave de autenticación WSKey
 * numeroFactura String Número identificativo de la factura de la que se quiere consultar el estado
 * emailEmpresa String Email de la empresa
 * returns FacturaConsultaEstado
 **/
exports.facturaEntidadConsultarEstado = function(wSKey,numeroFactura,emailEmpresa) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "estado" : "VALIDA"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Método asociado al servicio de entidad 'Factura'. Este método contiene lógica reutilizable y genérica para poder crear facturas nuevas
 *
 * body FacturaRegistro 
 * wSKey String Clave de autenticación WSKey
 * returns SuccessResponse
 **/
const FacturaRepository = require('../ConexionDB/FacturaRepository');

exports.facturaEntidadCrear = async function (body, wSKey) {
  try {
    const empresaId = body.empresaId;

    await FacturaRepository.insertarFactura(body, empresaId);

    return { mensaje: "Operación realizada con éxito." };
  } catch (err) {
    console.error("Error al crear la factura:", err);
    throw { error: err.message || "Error interno del servidor" };
  }
};



/**
 * Método asociado al servicio de entidad 'Factura'. Este método contiene lógica reutilizable y genérica para poder modificar el estado de una factura.
 *
 * body FacturaModificacionEstado  (optional)
 * wSKey String Clave de autenticación WSKey
 * returns SuccessResponse
 **/
exports.facturaEntidadModificarEstado = async function(body, wSKey) {
  try {
    const { numeroFactura, emailEmpresa, estado } = body;

    await FacturaRepository.actualizarEstadoFactura(numeroFactura, emailEmpresa, estado);

    return { mensaje: "Operación realizada con éxito." };
  } catch (error) {
    console.error("Error al modificar el estado de la factura:", error);
    throw { error: error.message || "Error interno del servidor" };
  }
};


