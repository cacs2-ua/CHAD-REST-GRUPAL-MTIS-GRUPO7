// FacturaRepository.js
'use strict';

const { connection } = require('./Conexion');   // ← sacamos solo la conexión
const db = connection.promise();                // ← habilitamos el modo promesa

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



