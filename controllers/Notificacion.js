'use strict';

var utils = require('../utils/writer.js');
var Notificacion = require('../service/NotificacionService');

module.exports.notificacionUtilityEnviarMensaje = function notificacionUtilityEnviarMensaje (req, res, next, body, wSKey) {
  const wSKeyReal =req.get('WSKey');
  Notificacion.notificacionUtilityEnviarMensaje(body, wSKeyReal)
    .then(function (response) {
      utils.writeJson(res, response.mensaje, response.status);
    })
    .catch(function (response) {
      utils.writeJson(res, response.mensaje, response.status);
    });
};
