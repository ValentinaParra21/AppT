import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 9001;


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conectado a MONGODB");
    })
    .catch((error) => {
        console.log(`Ocurrió un error al conectarse: ${error.message}`);
    });

export default port;