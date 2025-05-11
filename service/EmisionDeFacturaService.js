'use strict';


/**
 * Iniciar una tarea de emisión de factura
 *
 * body SolicitudEmisionFactura 
 * wSKey String Clave de autenticación WSKey
 * returns SuccessResponse
 **/
exports.emisionFactura = function(body,wSKey) {
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

