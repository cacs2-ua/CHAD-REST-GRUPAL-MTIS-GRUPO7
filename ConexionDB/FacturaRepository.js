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

  // Ejecutamos la consulta con la API basada en Promises
  await db.execute(sql, valores);
};

// Actualiza el estado de una factura
exports.actualizarEstadoFactura = async (numeroFactura, emailEmpresa, nuevoEstado) => {
  const sql = `
    UPDATE facturas f
    JOIN empresas e ON f.empresa_id = e.id
    SET f.estado = ?
    WHERE f.numero_factura = ? AND e.email = ?
  `;

  const [resultado] = await db.execute(sql, [nuevoEstado, numeroFactura, emailEmpresa]);

  if (resultado.affectedRows === 0) {
    throw new Error('Factura no encontrada con ese número y email');
  }
};

function obtenerFacturaPorNumeroYMail(numero, mail) {
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
}



module.exports = {
  obtenerFacturaPorNumeroYMail
};
