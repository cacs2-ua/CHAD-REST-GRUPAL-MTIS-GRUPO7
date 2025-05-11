'use strict';


/**
 * Método asociado al servicio de utilidad 'Notificaciones'. Este método contiene lógica reutilizable y genérica para enviar mensajes.
 *
 * body EnviarNotificacionRequest  (optional)
 * wSKey String Clave de autenticación WSKey
 * returns SuccessResponse
 **/
exports.notificacionUtilityEnviarMensaje = function(body,wSKey) {
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

