'use strict';

var utils = require('../utils/writer.js');
var Notificacion = require('../service/NotificacionService');

module.exports.notificacionUtilityEnviarMensaje = function notificacionUtilityEnviarMensaje (req, res, next, body, wSKey) {
  Notificacion.notificacionUtilityEnviarMensaje(body, wSKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
