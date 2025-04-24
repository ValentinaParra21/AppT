// services/emailService.js

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const enviarFacturaEmail = async (factura) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: factura.cliente.email,
      subject: `Factura #${factura.numeroFactura} - Triti Raclette`,
      html: `
        <h2>Estimado ${factura.cliente.nombre}</h2>
        <p>Adjunto encontrará su factura #${factura.numeroFactura} por un total de ${factura.total} COP.</p>
        <p>Gracias por su preferencia!</p>
      `,
      attachments: [{
        filename: `factura_${factura.numeroFactura}.pdf`,
        content: factura.pdfBuffer,
        contentType: 'application/pdf'
      }]
    };

    const info = await transporter.sendMail(mailOptions);
    return { messageId: info.messageId };
    
  } catch (error) {
    console.error('Error en emailService:', error);
    throw error;
  }
};