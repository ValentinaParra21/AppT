import Categoria from '../models/categoriaModel.js';
import { middleware } from '../middleware/middleware.js';
import {
    createCategoriaSchema,
    getCategoriaSchema,
    updateCategoriaSchema,
    deleteCategoriaSchema,
} from '../validators/categoriaValidator.js';


export const createCategoria = [
    middleware(createCategoriaSchema, "body"),
    async (req, res) => {
      const category = new Categoria(req.body);
      await category
        .save()
        .then((data) => res.status(201).json(data)) 
        .catch((error) => res.status(500).json({ message: error.message })); 
    },
  ];
  
  export const getCategoria = (req, res) => {
    Categoria
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  };
  
  export const getCategoriaById = [
    middleware(getCategoriaSchema, "params"),
    async (req, res) => {
      const { id } = req.params;
      try {
        const category = await Categoria.findById(id);
        if (!category) {
          return ress.status(404).json({
            message: "Categoria no encontrada",
          });
        }
        res.json(category);
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    },
  ];
  
  export const updateCategoria = [
    middleware(getCategoriaSchema, "params"),
    middleware(updateCategoriaSchema, "body"),
    async (req, res) => {
      const { id } = req.params;
      const { nombre, descripcion } = req.body;
      try {
        const categoryUpdate = await Categoria.updateOne(
          { _id: id },
          { $set: { nombre, descripcion } }
        );
        if (categoryUpdate.matchedCount === 0) {
          return res.status(404).json({ message: "Categoria no encontrada" });
        }
        if (categoryUpdate.modifiedCount === 0) {
          return res
            .status(400)
            .json({ message: "No se realizaron cambios en la categoria" });
        }
        res.status(200).json({ message: "Categoria actualizada correctamente" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  ];
  
  export const deleteCategoria = [
    middleware(deleteCategoriaSchema, "params"),
  
    async (req, res) => {
      const { id } = req.params;
      try {
        const result = Categoria.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
          res.status(404).json({ message: "Categoria no encontrada" });
        }
        res.status(200).json({ message: "Categoria eliminada correctamente" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  ];
  
