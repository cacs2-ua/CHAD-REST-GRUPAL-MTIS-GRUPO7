'use strict';

const mysql = require('mysql2');
const DB = require('./Conexion');

/**
 * Inserta una nueva factura en la tabla `facturas`.
 * @param {object} factura  Objeto que llega desde el servicio (coincide con el esquema OpenAPI)
 * @param {number} empresaId  ID de la empresa asociada
 */
exports.insertarFactura = async (factura, empresaId) => {
  const sql = `
    INSERT INTO facturas (
      numero_factura, empresa_id, base_imponible, iva, moneda, tipo, estado,
      es_subsanable, ha_sido_subsanada, fecha_rectificacion,
      fecha_desde_facturacion, fecha_hasta_facturacion, fecha_emision,
      factura_rectificada_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    factura.numeroFactura,
    empresaId,
    factura.baseImponible,
    factura.iva,
    factura.moneda,
    factura.tipo,
    factura.estado,
    factura.esSubsanable,
    factura.haSidoSubsanada ?? false,
    factura.fechaRectificacion ?? null,
    factura.fechaDesdeFacturacion,
    factura.fechaHastaFacturacion,
    factura.fechaEmision,
    factura.facturaRectificadaId ?? null
  ];

  await DB.connection.promise().execute(sql, valores);
};

// Actualiza el estado de una factura
exports.actualizarEstadoFactura = async (numeroFactura, emailEmpresa, estado, esSubsanable, haSidoSubsanada, fechaRectificacion) => {
  const sql = `
    UPDATE facturas f
    JOIN empresas e ON f.empresa_id = e.id
    SET 
      f.estado = ?,
      f.es_subsanable = ?,
      f.ha_sido_subsanada = ?,
      f.fecha_rectificacion = ?
    WHERE f.numero_factura = ? AND e.email = ?
  `;

  const [resultado] = await DB.connection.promise().execute(sql, [
    estado,
    esSubsanable ?? false,
    haSidoSubsanada ?? false,
    fechaRectificacion ?? null,
    numeroFactura,
    emailEmpresa
  ]);

  if (resultado.affectedRows === 0) {
    throw new Error('Factura no encontrada con ese número y email');
  }
};


// Devuelve el ID de la empresa dado su email
exports.obtenerIdEmpresaPorEmail = async (email) => {
  const sql = `SELECT id FROM empresas WHERE email = ?`;
  const [rows] = await DB.connection.promise().execute(sql, [email]);

  return rows.length > 0 ? rows[0].id : null;
};

// Devuelve todos los datos de una factura por número y empresa
exports.obtenerFacturaPorNumeroYEmpresa = async (numeroFactura, empresaId) => {
  const sql = `SELECT * FROM facturas WHERE numero_factura = ? AND empresa_id = ?`;
  const [rows] = await DB.connection.promise().execute(sql, [numeroFactura, empresaId]);

  return rows.length > 0 ? rows[0] : null;
};

// Devuelve solo el estado de la factura
exports.obtenerEstadoFactura = async (numeroFactura, empresaId) => {
  const sql = `SELECT estado FROM facturas WHERE numero_factura = ? AND empresa_id = ?`;
  const [rows] = await DB.connection.promise().execute(sql, [numeroFactura, empresaId]);

  return rows.length > 0 ? rows[0].estado : null;
};

// Devuelve una factura buscando por número y email (callback style)
exports.obtenerFacturaPorNumeroYMail = function (numero, mail) {
  return new Promise((resolve, reject) => {
    const queryEmpresa = 'SELECT id FROM empresas WHERE email = ?';
    DB.connection.query(queryEmpresa, [mail], (errEmp, resEmp) => {
      if (errEmp) {
        console.error(`Error al consultar empresa con email ${mail}:`, errEmp);
        return reject(errEmp);
      }
      if (!resEmp.length) {
        const error = new Error('Empresa no encontrada');
        error.status = 404;
        return reject(error);
      }

      const empresaId = resEmp[0].id;
      const queryFactura = `
        SELECT *
        FROM facturas
        WHERE numero_factura = ?
          AND empresa_id = ?
      `;
      DB.connection.query(queryFactura, [numero, empresaId], (errFac, resFac) => {
        if (errFac) {
          console.error(`Error al consultar factura número ${numero} para empresa ${empresaId}:`, errFac);
          return reject(errFac);
        }
        if (!resFac.length) {
          const error = new Error('Factura no encontrada');
          error.status = 404;
          return reject(error);
        }
        resolve(resFac[0]);
      });
    });
  });
};
