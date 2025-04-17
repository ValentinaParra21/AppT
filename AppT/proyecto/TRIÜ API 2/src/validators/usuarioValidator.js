import Joi from "joi";

//Creamos las validaciones para cada campo
const id = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base":
      "El campo ID debe ser un ObjectId válido de 24 caracteres hexadecimales.",
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
  const apellidos = Joi.string()
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
const correo = Joi.string() 
    .email({ tlds: { allow: false } }) 
    .required() 
    .messages({
      "string.email": "El campo correo debe ser un correo electrónico válido",
      "any.required": "El campo correo es requerido",
    });

    const password = Joi.string()
    .min(8) 
    .max(400) 
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$"))
    .required()
    .messages({
      "string.min": "La contraseña debe tener al menos 8 caracteres",
      "string.max": "La contraseña no puede tener más de 30 caracteres",
      "string.pattern.base": 
        "La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*)",
      "any.required": "El campo contraseña es requerido",
    });
  


const rol = Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
        "string.pattern.base": "El campo 'rol' debe ser un ObjectId válido.",
        "any.required": "El campo 'rol' es requerido."
    });



const createUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  apellidos: apellidos.required(),
  correo: correo.required(),
  password: password.required(),
  rol: rol.required(),
}); 

const updateUsuarioSchema = Joi.object({
  nombre: nombre.required(),
  apellidos: apellidos.required(),
  correo: correo.required(),
  password: password.required(),
  rol: rol.required(),
});

const getUsuarioSchema = Joi.object({
  id: id.required(),
});

const deleteUsuarioSchema = Joi.object({ 
  id: id.required(),
});

export { createUsuarioSchema, updateUsuarioSchema, getUsuarioSchema, deleteUsuarioSchema };
