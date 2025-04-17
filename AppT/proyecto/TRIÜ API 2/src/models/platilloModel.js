import mongoose from "mongoose";

const platilloSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        enum: ["Activo", "Inactivo"],
        required: true,
        default: "Activo"
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true,
    },
    ingredientes: [{
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'producto',
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        }
    }
    ]
});

export default mongoose.model("platillos", platilloSchema);