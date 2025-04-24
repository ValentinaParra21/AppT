import PDFDocument from 'pdfkit';
import fs from 'fs';

/**
 * Genera un PDF profesional para la factura
 * @param {Object} factura - Objeto con los datos de la factura
 * @returns {Promise<Buffer>} - Buffer del PDF generado
 */
export const generarPDFFactura = async (factura) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });
      const buffers = [];
      
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      
      // --- Encabezado ---
      doc.image('assets/logo.png', 50, 45, { width: 50 })
         .fillColor('#444444')
         .fontSize(20)
         .text('Triti Raclette', 110, 57)
         .fontSize(10)
         .text('Calle Principal 123', 200, 65, { align: 'right' })
         .text('Ciudad, País', 200, 80, { align: 'right' })
         .moveDown();

      // --- Datos Factura ---
      doc.fillColor('#444444')
         .fontSize(20)
         .text('Factura', 50, 120);
      
      generarLineaFactura(doc, 'Número', factura.numeroFactura, 150);
      generarLineaFactura(doc, 'Fecha', factura.fechaEmision.toLocaleDateString(), 170);
      generarLineaFactura(doc, 'Cliente', factura.cliente.nombre, 190);
      generarLineaFactura(doc, 'Identificación', factura.cliente.identificacion, 210);

      // --- Tabla de Productos ---
      const inicioTabla = 280;
      generarEncabezadoTabla(doc, inicioTabla);
      
      let posicionY = inicioTabla + 30;
      factura.items.forEach(item => {
        generarFilaProducto(
          doc,
          posicionY,
          item.nombre,
          item.cantidad,
          item.precioUnitario,
          item.subtotal
        );
        posicionY += 30;
      });

      // --- Totales ---
      doc.fontSize(14)
         .text(`Total: $${factura.total.toFixed(2)}`, 400, posicionY + 20, { align: 'right' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

// Funciones auxiliares
function generarLineaFactura(doc, titulo, valor, y) {
  doc.fontSize(12)
     .text(titulo + ':', 50, y)
     .text(valor, 150, y);
}

function generarEncabezadoTabla(doc, y) {
  doc.font('Helvetica-Bold')
     .fontSize(12)
     .text('Producto', 50, y)
     .text('Cantidad', 250, y, { width: 90, align: 'right' })
     .text('Precio', 350, y, { width: 90, align: 'right' })
     .text('Total', 450, y, { width: 90, align: 'right' })
     .moveTo(50, y + 20)
     .lineTo(550, y + 20)
     .stroke();
}

function generarFilaProducto(doc, y, nombre, cantidad, precio, total) {
  doc.font('Helvetica')
     .fontSize(10)
     .text(nombre, 50, y)
     .text(cantidad, 250, y, { width: 90, align: 'right' })
     .text(`$${precio.toFixed(2)}`, 350, y, { width: 90, align: 'right' })
     .text(`$${total.toFixed(2)}`, 450, y, { width: 90, align: 'right' });
}