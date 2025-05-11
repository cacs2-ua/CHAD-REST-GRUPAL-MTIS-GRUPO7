const nodemailer = require('nodemailer');

function createTransport() {
  return nodemailer.createTransport({
    host: 'localhost',   
    port: 2525,         
    secure: false,      
    tls: {
      rejectUnauthorized: false
    }
  });
}

/**
 * Envía un email utilizando el transportador configurado.
 * @param {string} de - Dirección de origen.
 *  * @param {string} para - Dirección de destino.
 * @param {string} asunto - Asunto del email.
 * @param {string} cuerpo - Cuerpo del mensaje.
 * @returns {Promise} - Promesa que se resuelve cuando el email se envía correctamente.
 */
function sendEmail(de, para, asunto, cuerpo) {
  const transporter = createTransport();
  const mailOptions = {
    from:   de,     
    to:     para,    
    subject: asunto, 
    text:   cuerpo   
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar email:', error);
        return reject(error);
      }
      console.log('Email enviado:', info.response);
      resolve(info);
    });
  });
}

module.exports = {
  createTransport,
  sendEmail
};
