import mongoose from "mongoose";

const rolSchema = mongoose.Schema({
    rol: {
        type: Number,
        required: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
    }
});

export default mongoose.model("rol", rolSchema);