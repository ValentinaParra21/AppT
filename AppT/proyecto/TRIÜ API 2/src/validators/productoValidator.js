import Joi from "joi";

const id = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base":
            "El campo ID debe ser un ObjectId valido de 24 caracteres hexadecimales.",
        "any.required":"El campo ID es requerido.",
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

const stock = Joi.number().precision(1).min(1).max(100).messages({
    "number.base": "La cantidad debe ser un número.",
    "number.min": "La cantidad debe ser mayor e igual a 1.",
    "number.max": "La cantidad no puede exceder 100.",
});

const cat_producto = Joi.string()
.pattern(/^[0-9a-fA-F]{24}$/)
.required()
.messages({
    "string.pattern.base": "El campo 'cat_producto' debe ser un ObjectId válido.",
    "any.required": "El campo 'cat_producto' es requerido."
});

const createProductoSchema = Joi.object({
    nombre: nombre.required(),
    stock: stock.required(),
    cat_producto: cat_producto.required(),
});

const updateProductoSchema = Joi.object({
    nombre: nombre.required(),
    stock: stock.required(),
    cat_producto: cat_producto.required(),
});

const getProductoSchema = Joi.object({
    id: id.required(),
});

const deleteProductoSchema = Joi.object({
    id: id.required(),
});

export{
    createProductoSchema,
    updateProductoSchema,
    getProductoSchema,
    deleteProductoSchema,
};