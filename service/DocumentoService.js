'use strict';
var DB = require('../ConexionDB/Conexion');
var DBFactura = require('../ConexionDB/FacturaRepository');
var SMTP = require('../ConexionFakeSMTP/ConexionFakeSMTP');



async function validarYObtenerFactura(wSKey, numeroFactura, emailEmpresa) {
  const restParam = await DB.obtenerRestKey();
  if (wSKey !== restParam.valor) {
    const err = new Error('WSKey no válida');
    err.status = 401;
    throw err;
  }
  const factura = await DBFactura.obtenerFacturaPorNumeroYMail(numeroFactura, emailEmpresa);
  return factura;
}

function manejarError(err) {
  if (err.status) {
    return { mensaje: { error: err.message }, status: err.status };
  }
  console.error('Error interno en documento utility:', err);
  return { mensaje: { error: 'Fallo del servidor' }, status: 500 };
}

/**
 * Método asociado al servicio de utilidad 'Documentos'. Este método contiene lógica reutilizable y genérica para exportar facturas a PDF.
 *
 * wSKey String Clave de autenticación WSKey
 * numeroFactura String Número identificativo de la factura que se quiere exportar a PDF.
 * emailEmpresa String Email de la empresa
 * returns SuccessResponse
 **/
exports.documentoUtilityExportarFacturaPDF = function(wSKey,numeroFactura,emailEmpresa) {
  return new Promise(async (resolve, reject) => {
    try {
      const factura = await validarYObtenerFactura(wSKey, numeroFactura, emailEmpresa);
      console.log(factura);
      
      resolve({ mensaje: { mensaje: 'Operación realizada con éxito' }, status: 200 });
    } catch (err) {
      reject(manejarError(err));
    }
  });
};


/**
 * Método asociado al servicio de utilidad 'Documentos'. Este método contiene lógica reutilizable y genérica para exportar facturas a XML.
 *
 * wSKey String Clave de autenticación WSKey
 * numeroFactura String Número identificativo de la factura que se quiere exportar a XML.
 * emailEmpresa String Email de la empresa
 * returns SuccessResponse
 **/
exports.documentoUtilityExportarFacturaXML = function(wSKey,numeroFactura,emailEmpresa) {
  return new Promise(async function(resolve, reject) {
     try {
      const factura = await validarYObtenerFactura(wSKey, numeroFactura, emailEmpresa);
      console.log(factura);

      resolve({ mensaje: { mensaje: 'Operación realizada con éxito' }, status: 200 });
    } catch (err) {
      reject(manejarError(err));
    }
  });
}

