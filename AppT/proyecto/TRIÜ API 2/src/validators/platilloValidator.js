import Joi from "joi";

const id = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base": "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
        "any.required": "El campo ID es requerido.",
    });

const nombre = Joi.string()
    .min(3)
    .max(90)
    .required()
    .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/)
    .messages({
        "string.base": "El nombre debe ser un texto",
        "string.empty": "El nombre no puede estar vacío.",
        "string.min": "El nombre debe tener al menos 3 caracteres.",
        "string.max": "El nombre no puede exceder los 90 caracteres.",
        "string.pattern.base": "El nombre solo puede contener letras y espacios.",
        "any.required": "El nombre es un campo requerido",
    });

const precio = Joi.number().precision(1).min(1).max(100000).messages({
    "number.base": "La cantidad debe ser un número.",
    "number.min": "La cantidad debe ser mayor o igual a 1.",
    "number.max": "La cantidad no puede exceder 1000.",
});

const descripcion = Joi.string()
    .min(3)
    .max(90)
    .messages({
        "string.min": "La descripción debe tener al menos 3 caracteres.",
        "string.max": "La descripción no puede exceder los 90 caracteres.",
    });

const estado = Joi.string()
    .valid("Activo", "Inactivo")
    .optional()
    .messages({
        "string.base": "El estado debe ser una cadena de texto.",
        "any.only": "El estado debe ser 'Activo' o 'Inactivo'."
    });

const categoria = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base": "El campo 'categoria' debe ser un ObjectId válido.",
        "any.required": "El campo 'categoria' es requerido."
    });

const ingrediente = Joi.object({
    producto: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            "string.pattern.base": "El campo producto debe ser un ObjectId válido de 24 caracteres hexadecimales.",
            "any.required": "El campo producto es requerido.",
        }),
    cantidad: Joi.number()
        .min(1)
        .required()
        .messages({
            "number.base": "La cantidad debe ser un número.",
            "number.min": "La cantidad debe ser mayor o igual a 1.",
            "any.required": "El campo cantidad es requerido.",
        }),
});

const ingredientes = Joi.array()
    .items(ingrediente)
    .min(1)
    .required()
    .messages({
        "array.base": "El campo ingredientes debe ser un array.",
        "array.min": "Debe agregar al menos un ingrediente.",
        "any.required": "El campo ingredientes es requerido.",
    });

const createPlatilloSchema = Joi.object({
    nombre: nombre.required(),
    descripcion: descripcion.required(),
    precio: precio.required(),
    estado: estado,
    categoria: categoria.required(),
    ingredientes: ingredientes.required(), // Agregar el campo ingredientes
});

const updatePlatilloSchema = Joi.object({
    nombre: nombre.required(),
    descripcion: descripcion.required(),
    precio: precio.required(),
    estado: estado.optional(),
    categoria: categoria.required(),
    ingredientes: ingredientes.required(), // Agregar el campo ingredientes
});

const getPlatilloSchema = Joi.object({
    id: id.required(),
});

const deletePlatilloSchema = Joi.object({
    id: id.required(),
});

export {
    createPlatilloSchema,
    getPlatilloSchema,
    updatePlatilloSchema,
    deletePlatilloSchema,
};