import platilloSchema from "../models/platilloModel.js";
import { middleware } from "../middleware/middleware.js";
import {
    createPlatilloSchema,
    getPlatilloSchema,
    updatePlatilloSchema,
    deletePlatilloSchema,
} from '../validators/platilloValidator.js';

export const createPlatillo = [
    middleware(createPlatilloSchema, "body"),
    async (req, res) => {
        const { nombre, descripcion, precio, estado, categoria, ingredientes } = req.body;

        try {
            const platillo = new platilloSchema({
                nombre,
                descripcion,
                precio,
                estado,
                categoria,
                ingredientes,
            });

            await platillo.save();
            res.status(201).json(platillo);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

export const getPlatillo = (req, res) => {
    platilloSchema
        .find()
        .populate('categoria')
        .populate('ingredientes.producto') // Poblar los ingredientes
        .then((data) => res.status(200).json({ data }))
        .catch((error) => res.status(500).json({ message: error }));
};

export const getPlatilloById = [
    middleware(getPlatilloSchema, "params"),
    async (req, res) => {
        const { id } = req.params;
        try {
            const platillo = await platilloSchema.findById(id)
                .populate('categoria')
                .populate('ingredientes.producto'); // Poblar los ingredientes

            if (!platillo) {
                return res.status(404).json({
                    message: "Platillo no encontrado",
                });
            }
            res.json(platillo);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },
];

export const updatePlatillo = [
    middleware(getPlatilloSchema, "params"),
    middleware(updatePlatilloSchema, "body"),
    async (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion, precio, estado, categoria, ingredientes } = req.body;

        try {
            const platilloUpdate = await platilloSchema.updateOne(
                { _id: id },
                { $set: { nombre, descripcion, precio, estado, categoria, ingredientes } }
            );

            if (platilloUpdate.matchedCount === 0) {
                return res.status(404).json({ message: "Platillo no encontrado" });
            }

            if (platilloUpdate.modifiedCount === 0) {
                return res.status(400).json({ message: "No se realizaron cambios en el platillo" });
            }

            res.status(200).json({ message: "Platillo actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];

export const deletePlatillo = [
    middleware(deletePlatilloSchema, "params"),
    async (req, res) => {
        const { id } = req.params;
        try {
            const result = await platilloSchema.deleteOne({ _id: id });
            if (result.deletedCount === 0) {
                res.status(404).json({ message: "Platillo no encontrado" });
            }
            res.status(200).json({ message: "Platillo eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
];