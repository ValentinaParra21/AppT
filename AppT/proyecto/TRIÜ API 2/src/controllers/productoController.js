import productoSchema from "../models/productoModel.js";
import { middleware } from "../middleware/middleware.js";
import {
    createProductoSchema,
    updateProductoSchema,
    getProductoSchema,
    deleteProductoSchema,
} from '../validators/productoValidator.js'


export const createProducto = [
    middleware(createProductoSchema, "body"),
    async (req, res) => {
        const producto = new productoSchema(req.body);
        await producto
            .save()
            .then((data) => res.status(201).json(data)) 
            .catch((error) => res.status(500).json({ message: error.message })); 
    },
];


export const getProducto = (req, res) => {
    productoSchema
        .find()
        .populate('cat_producto')
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(500).json({ message: error }));
};

export const getProductoById = [
    middleware(getProductoSchema, "params"),
    async (req, res) => {
      const { id } = req.params;
      try {
        const producto = await productoSchema.findById(id).populate('cat_producto');
        if (!producto) {
          return res.status(404).json({
            message: "Producto no encontrado",
          });
        }
        res.json(producto);
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    },
  ];

export const updateProducto = [
    middleware(getProductoSchema, "params"),
    middleware(updateProductoSchema, "body"),
    async (req, res) => {
      const { id } = req.params;
      const { nombre, stock, cat_producto } = req.body;
      try {
        const productoUpdate = await productoSchema.updateOne(
          { _id: id },
          { $set: { nombre, stock, cat_producto } }
        );
        if (productoUpdate.matchedCount === 0) {
          return res.status(404).json({ message: "Producto no encontrado" });
        }
        if (productoUpdate.modifiedCount === 0) {
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

  export const deleteProducto = [
    middleware(deleteProductoSchema, "params"),
  
    async (req, res) => {
      const { id } = req.params;
      try {
        const result = await productoSchema.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
          res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(200).json({ message: "Producto eliminado correctamente" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  ];

