'use strict';


/**
 * Método asociado al servicio de utilidad 'Validacion'. Este método contiene lógica reutilizable para poder validar un rango de fechas introducido.
 *
 * body SolicitudValidacionFechas  (optional)
 * wSKey String Clave de autenticación WSKey
 * returns FechasFacturacionValidasResponse
 **/
exports.fechas = function(body,wSKey) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mensaje" : "El rango de fechas sí es válido."
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Método asociado al servicio de utilidad 'Validacion'. Este método contiene lógica reutilizable para poder verificar si una empresa está registrada dentro del sistema.
 *
 * body SolicitudVerificarExisteEmpresa  (optional)
 * wSKey String Clave de autenticación WSKey
 * returns EmpresaSiExisteResponse
 **/
exports.validacionEmpresaExiste = function(body,wSKey) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mensaje" : "La empresa sí existe en el sistema"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Método asociado al servicio de utilidad 'Validacion'. Este método contiene lógica reutilizable para poder verificar si una factura existe a partir de su número de factura.
 *
 * body SolicitudVerificarExisteFactura  (optional)
 * wSKey String Clave de autenticación WSKey
 * returns FacturaSiExisteResponse
 **/
exports.validacionFacturaExiste = function(body,wSKey) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "mensaje" : "La factura sí existe en el sistema"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}



