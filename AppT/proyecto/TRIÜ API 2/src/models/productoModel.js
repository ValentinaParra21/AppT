import mongoose from "mongoose";

const productoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    cat_producto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cat_producto',
        required: true
    }
})

export default mongoose.model("producto",productoSchema)