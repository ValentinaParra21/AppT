// facturaModel.js (ya está correcto según lo que me mostraste)
import mongoose from "mongoose";

const FacturaSchema = mongoose.Schema({
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedidos',
        required: true
    },
    fechaEmision: {
        type: Date,
        required: true,
        default: Date.now
    },
    numeroFactura: {
        type: String,
        required: true,
        unique: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    impuestos: {
        type: Number,
        required: true,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    estadoPago: {
        type: String,
        enum: ["Pendiente", "Pagado", "Cancelado"],
        default: "Pendiente"
    },
    metodoPago: {
        type: String,
        enum: ["Efectivo", "Tarjeta", "Transferencia", "Otro"],
        required: true
    },
    detalles: {
        type: String,
        required: false
    },
    cliente: {
        type: Object,
        required: true
    },
    items: [{
        nombre: String,
        cantidad: Number,
        precioUnitario: Number,
        subtotal: Number
    }],
    generadaPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export default mongoose.model("Factura", FacturaSchema);