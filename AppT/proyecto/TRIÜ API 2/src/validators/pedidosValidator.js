import Joi from "joi";

// Esquemas básicos reutilizables
const objectIdSchema = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
        "string.pattern.base": "El ID debe ser un ObjectId válido de 24 caracteres hexadecimales",
        "any.required": "El ID es requerido"
    });

const fechaSchema = Joi.date().iso().messages({
    "date.base": "La fecha debe ser válida",
    "date.iso": "La fecha debe estar en formato ISO (YYYY-MM-DD)"
});

const horaSchema = Joi.string()
    .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .messages({
        "string.pattern.base": "La hora debe estar en formato HH:MM (24 horas)"
    });

const monedaSchema = Joi.number()
    .positive()
    .precision(2)
    .max(10000000)
    .messages({
        "number.base": "Debe ser un valor numérico",
        "number.positive": "Debe ser un valor positivo",
        "number.precision": "Máximo 2 decimales",
        "number.max": "El valor no puede exceder 10,000,000"
    });

const descripcionSchema = Joi.string()
    .min(3)
    .max(500)
    .messages({
        "string.empty": "La descripción no puede estar vacía",
        "string.min": "Mínimo 3 caracteres",
        "string.max": "Máximo 500 caracteres"
    });

const codigoSchema = Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .messages({
        "string.alphanum": "Solo caracteres alfanuméricos",
        "string.min": "Mínimo 3 caracteres",
        "string.max": "Máximo 20 caracteres"
    });

const estadoSchema = Joi.string()
    .valid("Activo", "Inactivo")
    .messages({
        "any.only": "Debe ser 'Activo' o 'Inactivo'"
    });

// Esquemas para elementos compuestos
const itemPlatilloSchema = Joi.object({
    platillo: objectIdSchema.required(),
    cantidad: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .required()
        .messages({
            "number.base": "La cantidad debe ser un número",
            "number.integer": "Debe ser un número entero",
            "number.min": "Mínimo 1 unidad",
            "number.max": "Máximo 100 unidades",
            "any.required": "La cantidad es requerida"
        })
}).messages({
    "object.base": "El platillo debe ser un objeto válido"
});

const platillosSchema = Joi.array()
    .items(itemPlatilloSchema)
    .min(1)
    .required()
    .messages({
        "array.base": "Debe ser un arreglo de platillos",
        "array.min": "Debe incluir al menos un platillo",
        "any.required": "Los platillos son requeridos"
    });

const clienteSchema = Joi.object({
    nombre: Joi.string().min(3).max(100).required()
        .messages({
            "string.empty": "El nombre es requerido",
            "string.min": "Mínimo 3 caracteres",
            "string.max": "Máximo 100 caracteres"
        }),
    identificacion: Joi.string().min(5).max(20).required()
        .messages({
            "string.empty": "La identificación es requerida",
            "string.min": "Mínimo 5 caracteres",
            "string.max": "Máximo 20 caracteres"
        }),
    direccion: Joi.string().min(5).max(200).optional(),
    telefono: Joi.string().min(7).max(15).optional(),
    email: Joi.string().email().optional()
        .messages({
            "string.email": "Debe ser un email válido"
        })
}).messages({
    "object.base": "Los datos del cliente deben ser un objeto válido"
});

const itemFacturaSchema = Joi.object({
    nombre: Joi.string().min(3).max(100).required(),
    cantidad: Joi.number().integer().min(1).required(),
    precioUnitario: monedaSchema.required(),
    subtotal: monedaSchema.required()
});

// Esquemas principales
export const createPedidoSchema = Joi.object({
    fecha: fechaSchema.required(),
    hora: horaSchema.required(),
    total: monedaSchema.required(),
    Descripcion: descripcionSchema.required(),
    CodigoP: codigoSchema.required(),
    estado: estadoSchema.required(),
    platillos: platillosSchema,
    cliente: clienteSchema.required()
}).options({ abortEarly: false });

export const updatePedidoSchema = Joi.object({
    fecha: fechaSchema.optional(),
    hora: horaSchema.optional(),
    total: monedaSchema.optional(),
    Descripcion: descripcionSchema.optional(),
    CodigoP: codigoSchema.optional(),
    estado: estadoSchema.optional(),
    platillos: platillosSchema.optional(),
    cliente: clienteSchema.optional()
})
.min(1)
.messages({
    "object.min": "Debe proporcionar al menos un campo para actualizar"
})
.options({ abortEarly: false });

export const getPedidosSchema = Joi.object({
    id: objectIdSchema.required()
});

export const deletePedidoSchema = getPedidosSchema;

// Esquema para facturación
export const facturaSchema = Joi.object({
    pedido: objectIdSchema.required(),
    numeroFactura: Joi.string().pattern(/^FAC-\d+-\d+$/).required(),
    subtotal: monedaSchema.required(),
    impuestos: monedaSchema.required(),
    total: monedaSchema.required(),
    estadoPago: Joi.string().valid("Pendiente", "Pagado", "Cancelado").required(),
    metodoPago: Joi.string().valid("Efectivo", "Tarjeta", "Transferencia", "Otro").required(),
    detalles: descripcionSchema.optional(),
    cliente: clienteSchema.required(),
    items: Joi.array().items(itemFacturaSchema).min(1).required(),
    generadaPor: objectIdSchema.optional()
});

// Validación de stock (función asincrónica)
export const validateStock = async (platillos) => {
    const errors = [];
    
    for (const [index, item] of platillos.entries()) {
        const platillo = await Platillos.findById(item.platillo);
        if (!platillo) {
            errors.push(`Platillo con ID ${item.platillo} no encontrado (posición ${index + 1})`);
            continue;
        }

        for (const ingrediente of platillo.ingredientes) {
            const producto = await Producto.findById(ingrediente.producto);
            if (!producto) {
                errors.push(`Producto con ID ${ingrediente.producto} no encontrado para platillo ${platillo.nombre}`);
                continue;
            }

            const cantidadNecesaria = ingrediente.cantidad * item.cantidad;
            if (producto.stock < cantidadNecesaria) {
                errors.push(`Stock insuficiente: ${producto.nombre} (necesario: ${cantidadNecesaria}, disponible: ${producto.stock})`);
            }
        }
    }

    if (errors.length > 0) {
        throw new Error(errors.join("; "));
    }
};