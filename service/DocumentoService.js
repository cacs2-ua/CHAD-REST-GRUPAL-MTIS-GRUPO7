'use strict';
var DB = require('../ConexionDB/Conexion');
var DBFactura = require('../ConexionDB/FacturaRepository');
var SMTP = require('../ConexionFakeSMTP/ConexionFakeSMTP');
const fs        = require('fs');
const path      = require('path');
const xml2js    = require('xml2js');

function formatTimestamp(date) {
  const pad = n => String(n).padStart(2, '0');
  const Y = date.getFullYear();
  const M = pad(date.getMonth() + 1);
  const D = pad(date.getDate());
  const h = pad(date.getHours());
  const m = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  return `${Y}${M}${D}_${h}${m}${s}`;
}

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

      const builder = new xml2js.Builder({ headless: true, renderOpts: { pretty: true } });
      const xmlObj = { Factura: factura };
      const xml     = builder.buildObject(xmlObj);

      const timestamp = formatTimestamp(new Date());
      const filename  = `${numeroFactura}_${timestamp}.xml`;
      const filepath  = path.join(__dirname, '../exported_xml', filename);

      await fs.promises.mkdir(path.dirname(filepath), { recursive: true });
      await fs.promises.writeFile(filepath, xml, 'utf8');

      resolve({ mensaje: { mensaje: 'Operación realizada con éxito' }, status: 200 });
    } catch (err) {
      reject(manejarError(err));
    }
  });
}

