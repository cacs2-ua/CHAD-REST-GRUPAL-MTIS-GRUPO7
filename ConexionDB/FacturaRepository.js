const mysql = require('mysql2');
const DB = require('./Conexion');


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
