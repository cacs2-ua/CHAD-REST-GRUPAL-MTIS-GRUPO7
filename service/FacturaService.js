'use strict';
const FacturaRepository = require('../ConexionDB/FacturaRepository');
const utils = require('../utils/Utils.js'); // IMPORTAR utils/Utils.js


/**
 * Método asociado al servicio de entidad 'Factura'. Este método contiene lógica reutilizable y genérica para poder consultar la estructura completa de una factura.
 *
 * wSKey String Clave de autenticación WSKey
 * numeroFactura String Número identificativo de la factura que se quiere consultar
 * emailEmpresa String Email de la empresa
 * returns FacturaConsulta
 **/
exports.facturaEntidadConsultar = async function(wSKey, numeroFactura, emailEmpresa) {
  try {
    await utils.validarWSKey(wSKey); 
    const empresaId = await FacturaRepository.obtenerIdEmpresaPorEmail(emailEmpresa);
    if (!empresaId) {
      throw { status: 404,
        error: "Empresa no encontrada" 
      };
    }

    const factura = await FacturaRepository.obtenerFacturaPorNumeroYEmpresa(numeroFactura, empresaId);
    if (!factura) {
      throw { status: 404,
        error: "Factura no encontrada" 
      };
    }

    // Formatear las fechas
    const fechaRectificacion = new Date(factura.fecha_rectificacion).toISOString().slice(0, 19);
    const fechaEmision = new Date(factura.fecha_emision).toISOString().slice(0, 19);
    const fechaDesdeFacturacion = new Date(factura.fecha_desde_facturacion).toISOString().split('T')[0];
    const fechaHastaFacturacion = new Date(factura.fecha_hasta_facturacion).toISOString().split('T')[0];

    // Adaptar el objeto factura a la estructura de FacturaConsulta del YAML
    return {
      id: factura.id,
      uuid: factura.uuid,
      numeroFactura: factura.numero_factura,
      empresaId: factura.empresa_id,
      facturaRectificadaId: factura.factura_rectificada_id,
      baseImponible: factura.base_imponible,
      iva: factura.iva,
      moneda: factura.moneda,
      tipo: factura.tipo,
      estado: factura.estado,
      esSubsanable: !!factura.es_subsanable,
      haSidoSubsanada: !!factura.ha_sido_subsanada,
      fechaRectificacion,
      fechaEmision,
      fechaDesdeFacturacion,
      fechaHastaFacturacion
    };
  } catch (err) {
    console.error("Error al consultar factura:", err);
    throw err;
  }
};


/**
 * Método asociado al servicio de entidad 'Factura'. Este método contiene lógica reutilizable y genérica para poder consultar el estado de una factura.
 *
 * wSKey String Clave de autenticación WSKey
 * numeroFactura String Número identificativo de la factura de la que se quiere consultar el estado
 * emailEmpresa String Email de la empresa
 * returns FacturaConsultaEstado
 **/
exports.facturaEntidadConsultarEstado = async function(wSKey, numeroFactura, emailEmpresa) {
  try {
    await utils.validarWSKey(wSKey); 
    const empresaId = await FacturaRepository.obtenerIdEmpresaPorEmail(emailEmpresa);
    if (!empresaId) {
      throw { status: 404,
        error: "Empresa no encontrada" 
      };
    }

    const estado = await FacturaRepository.obtenerEstadoFactura(numeroFactura, empresaId);
    if (!estado) {
      throw { status: 404,
        error: "Factura no encontrada" 
      };
    }

    return { estado };
  } catch (err) {
    console.error("Error al consultar estado de factura:", err);
    throw err;
  }
};


/**
 * Método asociado al servicio de entidad 'Factura'. Este método contiene lógica reutilizable y genérica para poder crear facturas nuevas
 *
 * body FacturaRegistro 
 * wSKey String Clave de autenticación WSKey
 * returns SuccessResponse
 **/

exports.facturaEntidadCrear = async function(body, wSKey) {
  try {
    await utils.validarWSKey(wSKey);  // ✅ Validamos la WSKey

    const factura = body;
    const empresaId = factura.empresaId;

    await FacturaRepository.insertarFactura(factura, empresaId);

    return { mensaje: "Factura creada correctamente" };  // 🟢 ¡Esto es lo que Swagger espera!
  } catch (error) {
    console.error("Error al crear factura:", error);
    throw {
      status: error.status || 500,
      error: error.salida || "Error interno del servidor"
    };
  }
};






/**
 * Método asociado al servicio de entidad 'Factura'. Este método contiene lógica reutilizable y genérica para poder modificar el estado de una factura.
 *
 * body FacturaModificacionEstado  (optional)
 * wSKey String Clave de autenticación WSKey
 * returns SuccessResponse
 **/
exports.facturaEntidadModificarEstado = async function(body, wSKey) {
  try {
    await utils.validarWSKey(wSKey); // 👈 Validar WSKey aquí también

    const {
      numeroFactura,
      emailEmpresa,
      estado,
      esSubsanable,
      haSidoSubsanada,
      fechaRectificacion
    } = body;

    await FacturaRepository.actualizarEstadoFactura(
      numeroFactura,
      emailEmpresa,
      estado,
      esSubsanable,
      haSidoSubsanada,
      fechaRectificacion
    );

    return { mensaje: "Operación realizada con éxito." };
  } catch (error) {
    console.error("Error al modificar el estado de la factura:", error);
  throw {
    status: error.status || 500,  // ✅ AÑADE ESTO
    error: error.salida || error.message || "Error interno del servidor"
  };
  }
};

