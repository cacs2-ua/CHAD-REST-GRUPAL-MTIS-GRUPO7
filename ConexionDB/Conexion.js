const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',           
<<<<<<< HEAD
  password: 'ali123',       
=======
  password: '098123',       
>>>>>>> 160047513ed88f355722d8fe1017a610e48ffebe
  database: 'facturacion'  
});

// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err);
    return;
  }
  console.log('Conexión a MySQL establecida.');
});

function obtenerRestKey() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM parametros WHERE clave = ?';
    connection.query(query, ["rest_key"], (error, results) => {
      if (error) {
        console.error('Error al consultar la rest_key:', error);
        return reject(error);
      }
      if(results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
}

function obtenerEmpresa(email) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM empresas WHERE email = ?';
    connection.query(query, [email], (error, results) => {
      if (error) {
        console.error('Error al hacer el select:', error);
        return reject(error);
      }
      if(results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
}

function obtenerFactura(empresaId,facturaId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM facturas WHERE numero_factura = ? AND empresa_id = ?';
    connection.query(query, [facturaId,empresaId], (error, results) => {
      if (error) {
        console.error('Error al hacer el select:', error);
        return reject(error);
      }
      if(results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
}

module.exports = {
  connection,
  obtenerRestKey,
  obtenerEmpresa,
  obtenerFactura
};
