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

const descripcion = Joi.string()
    .min(3)
    .max(90)
    .messages({
      "string.min": "La descripción debe tener al menos 3 caracteres.",
      "string.max": "La descripción no puede exceder los 90 caracteres.",
    });

const createCategoriaSchema = Joi.object({
    nombre: nombre.required(),
    descripcion: descripcion.required(),
});

const updateCategoriaSchema = Joi.object({
    nombre: nombre.required(),
    descripcion: descripcion.required(),
});

const getCategoriaSchema = Joi.object({
    id: id.required(),
});

const deleteCategoriaSchema = Joi.object({
    id: id.required(),
});

export {
    createCategoriaSchema,
    getCategoriaSchema,
    updateCategoriaSchema,
    deleteCategoriaSchema,
};
  