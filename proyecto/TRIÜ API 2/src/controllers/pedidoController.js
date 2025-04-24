import Pedidos from "../models/pedidoModel.js";
import Platillos from "../models/platilloModel.js";
import Producto from "../models/productoModel.js";
import Facturas from "../models/facturaModel.js"; // Añadido
import { middleware } from "../middleware/middleware.js";
import {
  createPedidoSchema,
  updatePedidoSchema,
  getPedidosSchema,
  deletePedidoSchema,
} from "../validators/pedidosValidator.js";

export const createPedido = [
  middleware(createPedidoSchema, "body"),
  async (req, res) => {
    const { platillos, total, Descripcion, cliente } = req.body; // Añadido cliente

    try {
      // 1. Validar y descontar del inventario (manteniendo tu lógica actual)
      for (const item of platillos) {
        const platillo = await Platillos.findById(item.platillo);
        if (!platillo) {
          return res.status(404).json({ 
            message: `Platillo con ID ${item.platillo} no encontrado` 
          });
        }

        for (const ingrediente of platillo.ingredientes) {
          const producto = await Producto.findById(ingrediente.producto);
          if (!producto) {
            return res.status(404).json({ 
              message: `Producto con ID ${ingrediente.producto} no encontrado` 
            });
          }

          const cantidadNecesaria = ingrediente.cantidad * item.cantidad;
          if (producto.stock < cantidadNecesaria) {
            return res.status(400).json({ 
              message: `No hay suficiente stock para ${producto.nombre}` 
            });
          }

          producto.stock -= cantidadNecesaria;
          await producto.save();
        }
      }

      // 2. Crear el pedido (manteniendo tu estructura actual)
      const nuevoPedido = new Pedidos({
        fecha: new Date(),
        hora: new Date().toLocaleTimeString(),
        total,
        Descripcion,
        platillos,
      });
      await nuevoPedido.save();

      // 3. Generar factura automáticamente (nueva funcionalidad)
      const nuevaFactura = new Facturas({
        pedido: nuevoPedido._id,
        fechaEmision: new Date(),
        numeroFactura: `FAC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        subtotal: total * 0.85, // Ejemplo: 85% del total
        impuestos: total * 0.15, // Ejemplo: 15% de impuestos
        total: total,
        estadoPago: "Pendiente",
        metodoPago: "Efectivo", // Valor por defecto
        detalles: Descripcion || "Factura generada automáticamente",
        cliente: {
          nombre: cliente?.nombre || "Consumidor final",
          identificacion: cliente?.identificacion || "0000000000",
          direccion: cliente?.direccion || "No especificada",
          telefono: cliente?.telefono || "No especificado",
          email: cliente?.email || "No especificado"
        },
        items: await Promise.all(platillos.map(async (item) => {
          const platillo = await Platillos.findById(item.platillo);
          return {
            nombre: platillo?.nombre || `Platillo ${item.platillo}`,
            cantidad: item.cantidad,
            precioUnitario: platillo?.precio || 0,
            subtotal: (platillo?.precio || 0) * item.cantidad
          };
        })),
        generadaPor: req.user?._id // Si tienes autenticación
      });

      await nuevaFactura.save();

      // 4. Retornar ambos objetos
      res.status(201).json({
        pedido: nuevoPedido,
        factura: nuevaFactura,
        message: "Pedido y factura creados exitosamente"
      });

    } catch (error) {
      res.status(500).json({ 
        message: "Error al procesar el pedido",
        error: error.message 
      });
    }
  },
];

export const getPedido  = (req, res) => {
    Pedidos
        .find()
        .then((data) => res.status(201).json(data))
        .catch((error) => res.status(501).json({ message: error }));
};

export const getPedidoEs =[
    middleware(getPedidosSchema, "params"),
    async (req, res) =>{
        const { id } = req.params;
        try {
         const pedido = await Pedidos.findById(id);
         if (!pedido) {
            return res.status(404).json({
                message: "Pedido no encontrado"
            });
         }
         res.json(pedido);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },
];


export const updatePedido = [
    middleware(getPedidosSchema, "params"),
    middleware(updatePedidoSchema, "body"),
    async (req, res) => {
      const { id } = req.params;
      const { platillos, fecha, hora, total, Descripcion, estado } = req.body;

      try {
          // 1. Obtener el pedido actual
          const pedidoActual = await Pedidos.findById(id);
          if (!pedidoActual) {
              return res.status(404).json({ message: "Pedido no encontrado" });
          }

          // 2. Revertir los descuentos del inventario del pedido actual
          for (const item of pedidoActual.platillos) {
              const platillo = await Platillos.findById(item.platillo);
              if (!platillo) continue;

              for (const ingrediente of platillo.ingredientes) {
                  const producto = await Producto.findById(ingrediente.producto);
                  if (!producto) continue;

                  // Revertir el descuento
                  producto.stock += ingrediente.cantidad * item.cantidad;
                  await producto.save();
              }
          }

          // 3. Aplicar los descuentos del inventario para los nuevos platillos
          for (const item of platillos) {
              const platillo = await Platillos.findById(item.platillo);
              if (!platillo) {
                  return res.status(404).json({ message: `Platillo con ID ${item.platillo} no encontrado` });
              }

              for (const ingrediente of platillo.ingredientes) {
                  const producto = await Producto.findById(ingrediente.producto);
                  if (!producto) {
                      return res.status(404).json({ message: `Producto con ID ${ingrediente.producto} no encontrado` });
                  }

                  // Calcular la cantidad necesaria
                  const cantidadNecesaria = ingrediente.cantidad * item.cantidad;

                  // Verificar si hay suficiente stock
                  if (producto.stock < cantidadNecesaria) {
                      return res.status(400).json({ message: `No hay suficiente stock para ${producto.nombre}` });
                  }

                  // Descontar del inventario
                  producto.stock -= cantidadNecesaria;
                  await producto.save();
              }
          }

          // 4. Actualizar el pedido
          const pedidoUpdate = await Pedidos.updateOne(
              { _id: id },
              { $set: { platillos, fecha, hora, total, Descripcion, estado } }
          );

          if (pedidoUpdate.matchedCount === 0) {
              return res.status(404).json({ message: "Pedido no encontrado" });
          }

          res.status(200).json({ message: "Pedido actualizado correctamente" });
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  },
];

  export const deletePedido = [
    middleware(deletePedidoSchema, "params"),
  
    async (req, res) => {
      const { id } = req.params;
      try {
        const result = await Pedidos.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
          res.status(404).json({ message: "Pedido no encontrada" });
        }
        res.status(200).json({ message: "Pedidos eliminada correctamente" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
];