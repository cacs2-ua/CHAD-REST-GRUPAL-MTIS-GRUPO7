/*

const utils = require('../utils/Utils.js'); // IMPORTAR utils/Utils.js

exports.nuevoDispositivo = async function(body, wSKey) {
  try {
    await utils.validarWSKey(wSKey);     // ESTA ES LA LINEA QUE IMPORTA. Basta con poner esta línea tal cual allá donde se quiera validar el WSKey
    // Insertamos el dispositivo
    await dispositivosRepository.insertarDispositivo(body);
    // Consultamos el dispositivo insertado usando el código
    let dispositivoInsertado = await dispositivosRepository.consultarDispositivo(body.codigo);
    return { 
      ...dispositivoInsertado,
      salida: "Dispositivo insertado correctamente" 
    };
  } catch (error) {
    throw { 
      status: 404,
      message: error.message,
      salida: error.message 
    };
  }
}

*/