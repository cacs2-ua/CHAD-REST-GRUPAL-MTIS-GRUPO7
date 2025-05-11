'use strict';


/**
 * Método asociado al servicio de utilidad 'Documentos'. Este método contiene lógica reutilizable y genérica para exportar facturas a PDF.
 *
 * wSKey String Clave de autenticación WSKey
 * numeroFactura String Número identificativo de la factura que se quiere exportar a PDF.
 * emailEmpresa String Email de la empresa
 * returns SuccessResponse
 **/
exports.documentoUtilityExportarFacturaPDF = function(wSKey,numeroFactura,emailEmpresa) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mensaje" : "Operación realizada con éxito."
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Método asociado al servicio de utilidad 'Documentos'. Este método contiene lógica reutilizable y genérica para exportar facturas a XML.
 *
 * wSKey String Clave de autenticación WSKey
 * numeroFactura String Número identificativo de la factura que se quiere exportar a XML.
 * emailEmpresa String Email de la empresa
 * returns SuccessResponse
 **/
exports.documentoUtilityExportarFacturaXML = function(wSKey,numeroFactura,emailEmpresa) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mensaje" : "Operación realizada con éxito."
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

