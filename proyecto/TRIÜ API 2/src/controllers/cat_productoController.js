import cat_productoSchema from "../models/cat_productoModel.js";
import { middleware } from "../middleware/middleware.js";
import {
    createCat_ProductoSchema,
    updateCat_ProductoSchema,
    getCat_ProductoSchema,
    deleteCat_ProductoSchema,
} from '../validators/cat_productoValidator.js'


export const createCat_Producto = [
    middleware(createCat_ProductoSchema, "body"),
    async (req, res) => {
        const cat_producto = new cat_productoSchema(req.body);
        await cat_producto
            .save()
            .then((data) => res.status(201).json(data)) 
            .catch((error) => res.status(500).json({ message: error.message })); 
    },
];


export const getCat_Producto = (req, res) => {
    cat_productoSchema
        .find()
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(500).json({ message: error }));
};

export const getCat_ProductoById = [
    middleware(getCat_ProductoSchema, "params"),
    async (req, res) => {
      const { id } = req.params;
      try {
        const cat_producto = await cat_productoSchema.findById(id);
        if (!cat_producto) {
          return res.status(404).json({
            message: "Producto no encontrado",
          });
        }
        res.json(cat_producto);
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    },
  ];

export const updateCat_Producto = [
    middleware(getCat_ProductoSchema, "params"),
    middleware(updateCat_ProductoSchema, "body"),
    async (req, res) => {
      const { id } = req.params;
      const { nombre } = req.body;
      try {
        const cat_productoUpdate = await cat_productoSchema.updateOne(
          { _id: id },
          { $set: { nombre } }
        );
        if (cat_productoUpdate.matchedCount === 0) {
          return res.status(404).json({ message: "Producto no encontrado" });
        }
        if (cat_productoUpdate.modifiedCount === 0) {
          return res
            .status(400)
            .json({ message: "No se realizaron cambios en el producto" });
        }
        res.status(200).json({ message: "Producto actualizado correctamente" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  ];

  export const deleteCat_Producto = [
    middleware(deleteCat_ProductoSchema, "params"),
  
    async (req, res) => {
      const { id } = req.params;
      try {
        const result = await cat_productoSchema.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
          res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado correctamente" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  ];

