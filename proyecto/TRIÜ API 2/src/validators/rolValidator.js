import Joi from "joi";

//Creamos las validaciones para cada campo en la tabla de roles 

const id = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base":
      "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
    "any.required": "El campo ID es requerido.",
  });

  const rol = Joi.number() 
  .required()
  .messages({
    "number.base": "El valor del Rol debe ser válido.",
    "number.format": "El debe tener un valor que no contenga decimales, y sea un numero entero de 1 a 3.",
    "any.required": "El rol es un campo requerido.",
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

//Ahora crearemos las validaciones para los métodos de la lógica
 
const createRolSchema = Joi.object({
 rol: rol.required(),
 nombre: nombre.required(),
});

const updateRolSchema = Joi.object({
 rol: rol.required(),
 nombre: nombre.required(),
});

const getRolSchema = Joi.object({
  id: id.required(),
});

const deleteRolSchema = Joi.object({
  id: id.required(),
});

export {
  createRolSchema,
  getRolSchema,
  updateRolSchema,                                                                                                                                                                                                                                                                                 
  deleteRolSchema,
};
