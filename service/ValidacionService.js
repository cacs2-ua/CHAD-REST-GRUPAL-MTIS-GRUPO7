'use strict';
var DB = require('../ConexionDB/Conexion');

/**
 * Método asociado al servicio de utilidad 'Validacion'. Este método contiene lógica reutilizable para poder validar un rango de fechas introducido.
 *
 * body SolicitudValidacionFechas  (optional)
 * wSKey String Clave de autenticación WSKey
 * returns FechasFacturacionValidasResponse
 **/


exports.fechas = function(body,wSKey) {
  return new Promise(async function(resolve, reject) {
    var result = {};
    result['application/json'] = {
      "mensaje":{"resultado":true}
    };
    try {
      const WSKeyDb = await DB.obtenerRestKey();
      if (wSKey != WSKeyDb.valor){
        return reject({ mensaje: { error: "WSKey key no válida" }, status: 401 });
      }
      const fechaDesde = body.fechaDesde;
      const fechaHasta = body.fechaHasta;
      const regex = /^\d{4}[-\/]\d{2}[-\/]\d{2}$/;  //Regex para pillar / o -

    if (!regex.test(fechaDesde) || !regex.test(fechaHasta)) {
      return reject({
        mensaje : {resultado : false }
      });
    }
    
    if(new Date(fechaDesde) >= new Date(fechaHasta)){
      return reject({
        mensaje : {resultado : false }
      })
    }

      if (Object.keys(result).length > 0) {
        resolve(result[Object.keys(result)[0]]);
      } else {
        resolve();
      }
    } catch (error) {
      return reject({
        status: 500,
        mensaje: "Error de servidor."
      })
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
  return new Promise(async function (resolve, reject) {
    var result = {};
    result['application/json'] = {
      "mensaje":{"resultado":true}
    };
    try {
      const WSKeyDb = await DB.obtenerRestKey();
      if (wSKey != WSKeyDb.valor){
        return reject({ mensaje: { error: "WSKey key no válida" }, status: 401 });
      }
      var email = body.email;
      //Regex para comprobar que es un email
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!email || !regex.test(email)){
        return reject({
          mensaje : {resultado : false }
        });
      }
      var empresa = await DB.obtenerEmpresa(email);

      if(!empresa){
        return reject({
          mensaje : {resultado : false }
        });
      }

      
      if (Object.keys(result).length > 0) {
        resolve(result[Object.keys(result)[0]]);
      } else {
        resolve();
      }
    } catch (error) {
      console.log(error);
      return reject({
        status: 500,
        mensaje: "Error de servidor.",
      })
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
  return new Promise(async function(resolve, reject) {
    var result = {};
    result['application/json'] = {
      "mensaje":{"resultado":true}
    };
    try {
      const WSKeyDb = await DB.obtenerRestKey();
      if (wSKey != WSKeyDb.valor){
        return reject({ mensaje: { error: "WSKey key no válida" }, status: 401 });
      }
      var email = body.emailEmpresa;
      var numFactura = body.numeroFactura;
      //Regex para comprobar que es un email
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!email || !regex.test(email)){
        return reject({
          mensaje : {resultado : false }
        });
      }
      var empresa = await DB.obtenerEmpresa(email);

      if(!empresa){
        return reject({
          mensaje : {resultado : false }
        });
      }

      var facturaDB = await DB.obtenerFactura(empresa.id,numFactura)

      if(!facturaDB){
        return reject({
          mensaje : {resultado : false }
        });
      }
      
      if (Object.keys(result).length > 0) {
        resolve(result[Object.keys(result)[0]]);
      } else {
        resolve();
      }
    } catch (error) {
      console.log(error);
      return reject({
        status: 500,
        mensaje: "Error de servidor."
      })
    }
  });
}



