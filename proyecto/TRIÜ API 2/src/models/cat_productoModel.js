    import mongoose from "mongoose";

    const cat_productoSchema = mongoose.Schema({
        nombre:{
            type: String,
            required: true,
        }
    })

    export default mongoose.model("cat_producto",cat_productoSchema)