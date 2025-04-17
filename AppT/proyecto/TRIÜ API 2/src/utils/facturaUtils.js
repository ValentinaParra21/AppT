// utils/facturaUtils.js
export function generateFacturaNumber() {
    const fecha = new Date();
    const year = fecha.getFullYear().toString().slice(-2);
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const day = fecha.getDate().toString().padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    
    return `FACT-${year}${month}${day}-${random}`;
}