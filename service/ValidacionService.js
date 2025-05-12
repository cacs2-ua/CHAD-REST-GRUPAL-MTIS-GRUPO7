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
    "resultado" : true,
    "mensaje": "La fecha es valida",
    "status": 200
    };
    try {
      const WSKeyDb = await DB.obtenerRestKey();
      if (wSKey != WSKeyDb.valor){
        return reject({
          status: 403,
          mensaje: "La Wskey no es valida",
          resultado : false
        });
      }
      const fechaDesde = body.fechaDesde;
      const fechaHasta = body.fechaHasta;
      const regex = /^\d{4}[-\/]\d{2}[-\/]\d{2}$/;  //Regex para pillar / o -

    if (!regex.test(fechaDesde) || !regex.test(fechaHasta)) {
      return reject({
        status: 401,
        mensaje: "Fecha(s) inválida(s). El formato debe ser yyyy/MM/dd.",
        resultado : false
      });
    }
    
    if(new Date(fechaDesde) >= new Date(fechaHasta)){
      return reject({
        status: 402,
        mensaje: "La fecha desde es anterior a fecha hasta.",
        resultado : false
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
        mensaje: "Error de servidor.",
        resultado : false
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
      "status":200,
      "mensaje" : "La empresa sí existe en el sistema",
      "resultado":true
    };
    try {
      const WSKeyDb = await DB.obtenerRestKey();
      if (wSKey != WSKeyDb.valor){
        return reject({
          status: 403,
          mensaje: "La Wskey no es valida",
          resultado : false
        });
      }
      var email = body.email;
      //Regex para comprobar que es un email
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!email || !regex.test(email)){
        return reject({
          status: 402,
          mensaje: "El email no es valido",
          resultado : false
        });
      }
      var empresa = await DB.obtenerEmpresa(email);

      if(!empresa){
        return reject({
          status: 400,
          mensaje: "La empresa con ese email no existe",
          resultado : false
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
        resultado : false
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
      "status":200,
      "mensaje" : "La factura sí existe en el sistema",
      "resultado":true
    };
    try {
      const WSKeyDb = await DB.obtenerRestKey();
      if (wSKey != WSKeyDb.valor){
        return reject({
          status: 403,
          mensaje: "La Wskey no es valida",
          resultado : false
        });
      }
      var email = body.emailEmpresa;
      var numFactura = body.numeroFactura;
      //Regex para comprobar que es un email
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!email || !regex.test(email)){
        return reject({
          status: 402,
          mensaje: "El email no es valido",
          resultado : false
        });
      }
      var empresa = await DB.obtenerEmpresa(email);

      if(!empresa){
        return reject({
          status: 400,
          mensaje: "La empresa con ese email no existe",
          resultado : false
        });
      }

      var facturaDB = await DB.obtenerFactura(empresa.id,numFactura)

      if(!facturaDB){
        return reject({
          status: 400,
          mensaje: "La factura con ese numero de factura no existe en esa empresa",
          resultado : false
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
        resultado : false
      })
    }
  });
}



