'use strict';
var DB = require('../ConexionDB/Conexion');
var SMTP = require('../ConexionFakeSMTP/ConexionFakeSMTP');

/**
 * Método asociado al servicio de utilidad 'Notificaciones'. Este método contiene lógica reutilizable y genérica para enviar mensajes.
 *
 * body EnviarNotificacionRequest  (optional)
 * wSKey String Clave de autenticación WSKey
 * returns SuccessResponse
 **/
exports.notificacionUtilityEnviarMensaje = function(body,wSKey) {
  return new Promise(async function(resolve, reject) {
    try{
    const WSKeyDb = await DB.obtenerRestKey();
    //console.log(WSKeyDb.valor);
    if (wSKey != WSKeyDb.valor){
      //console.log(wSKey);
      reject({ mensaje: { error: "WSKey key no válida" }, status: 401 });
    }
    else{
      SMTP.sendEmail(body.de, body.para, body.asunto, body.cuerpo);
      resolve({ mensaje: {mensaje: "Notificación enviada con éxito"}, status: 201 });

    }
    }
    catch(error){
      reject({ mensaje: { error: "Fallo del servidor" }, status: 500 });
    }
  });
}

