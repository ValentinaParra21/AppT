import Joi from "joi";

export const createFacturaSchema = Joi.object({
    pedido: Joi.string().required(),
    cliente: Joi.object({
        nombre: Joi.string().required(),
        identificacion: Joi.string().required(),
        direccion: Joi.string().optional(),
        telefono: Joi.string().optional()
    }).required(),
    metodoPago: Joi.string().valid("Efectivo", "Tarjeta", "Transferencia", "Otro").required()
});

export const getFacturaSchema = Joi.object({
    id: Joi.string().required()
});

export const updateFacturaSchema = Joi.object({
    estadoPago: Joi.string().valid("Pendiente", "Pagado", "Cancelado").optional(),
    metodoPago: Joi.string().valid("Efectivo", "Tarjeta", "Transferencia", "Otro").optional(),
    detalles: Joi.string().optional()
});

export const deleteFacturaSchema = Joi.object({
    id: Joi.string().required()
});

export const updateEstadoFacturaSchema = Joi.object({
    estadoPago: Joi.string().valid("Pendiente", "Pagado", "Cancelado").required()
  }).unknown(true);
  