import Facturas from "../models/facturaModel.js";
import { middleware } from "../middleware/middleware.js";
import {
  createFacturaSchema,
  updateFacturaSchema,
  getFacturaSchema,
  deleteFacturaSchema,
  updateEstadoFacturaSchema,
} from "../validators/facturaValidator.js";

export const createFactura = [
  middleware(createFacturaSchema, "body"),
  async (req, res) => {
    try {
      // Asegurar que el número de factura sea único
      req.body.numeroFactura = req.body.numeroFactura || `FAC-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      const factura = new Facturas(req.body);
      await factura.save();
      res.status(201).json(factura);
    } catch (error) {
      res.status(500).json({ 
        message: "Error al crear la factura",
        error: error.message 
      });
    }
  },
];

export const getFactura = async (req, res) => {
  try {
    const facturas = await Facturas.find().populate("pedido"); // Cambiado de "Pedidos" a "pedido"
    res.status(200).json(facturas);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener las facturas",
      error: error.message 
    });
  }
};

export const getFacturasEs = [
  middleware(getFacturaSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const factura = await Facturas.findById(id).populate("pedido"); // Cambiado de "Pedidos" a "pedido"
      if (!factura) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }
      res.json(factura);
    } catch (error) {
      res.status(500).json({ 
        message: "Error al obtener la factura",
        error: error.message 
      });
    }
  },
];

export const updateFactura = [
  middleware(getFacturaSchema, "params"),
  middleware(updateFacturaSchema, "body"),
  async (req, res) => {
    const { id } = req.params;
    const { nombre, celular, valor, correo, pedido } = req.body; // Cambiado de "Pedidos" a "pedido"
    try {
      const facturaUpdate = await Facturas.updateOne(
        { _id: id },
        { $set: { nombre, celular, valor, correo, pedido } } // Cambiado de "Pedidos" a "pedido"
      );
      
      if (facturaUpdate.matchedCount === 0) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }
      if (facturaUpdate.modifiedCount === 0) {
        return res.status(400).json({ message: "No se realizaron cambios en la factura" });
      }
      res.status(200).json({ 
        message: "Factura actualizada correctamente",
        updatedFields: { nombre, celular, valor, correo, pedido }
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Error al actualizar la factura",
        error: error.message 
      });
    }
  },
];

export const deleteFactura = [
  middleware(deleteFacturaSchema, "params"),
  async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Facturas.deleteOne({ _id: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }
      res.status(200).json({ message: "Factura eliminada correctamente" });
    } catch (error) {
      res.status(500).json({ 
        message: "Error al eliminar la factura",
        error: error.message 
      });
    }
  },
];

export const updateEstadoFactura = [
  middleware(updateEstadoFacturaSchema, "body"),
  async (req, res) => {
    const { id } = req.params;
    const { estadoPago } = req.body;

    if (!estadoPago) {
      return res.status(400).json({ message: "Falta el campo 'estadoPago'" });
    }

    try {
      const factura = await Facturas.findByIdAndUpdate(
        id,
        { estadoPago },
        { new: true }
      );

      if (!factura) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }

      res.status(200).json({ 
        message: "Estado de factura actualizado correctamente",
        factura
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Error al actualizar el estado de la factura",
        error: error.message 
      });
    }
  },
];