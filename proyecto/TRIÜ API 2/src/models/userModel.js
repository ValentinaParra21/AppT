import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'rol',
            required: true
        }
    ]

     
});

export default mongoose.model("User", userSchema);