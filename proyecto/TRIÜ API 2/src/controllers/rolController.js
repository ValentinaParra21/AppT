import rolSchema from "../models/rolModel.js";
import {middleware} from "../middleware/middleware.js";


import {createRolSchema, getRolSchema, updateRolSchema, deleteRolSchema,                                                                                                                                                                                                                                                                                 
} from "../validators/rolValidator.js"



//   res.send("Esta ruta esta pensada para crear un Rol nuevo");
export const CreateRol = [
  middleware(createRolSchema, "body"),
  async (req, res) => { 
    const Rol = new rolSchema(req.body);

    await Rol
      .save()
      .then((data) => res.status(201).json(data)) 
      .catch((error) => res.status(500).json({ message: error.message })); 
  },
];

export const getRol = (req, resp) => {
  rolSchema
    .find() //Metodo usado para buscar todos los docs de una coleccion
    .then((data) => resp.json(data))
    .catch((error) => resp.json({ message: error }));
};

export const getRolById = [
  middleware(getRolSchema, "params"),
  async (req, resp) => {
    const { id } = req.params;
    try {
      const Rol = await rolSchema.findById(id);
      if (!Rol) {
        return resp.status(404).json({
          message: "Rol no encontrado",
        });
      }
      resp.json(Rol);
    } catch (error) {
      resp.status(500).json({
        message: error.message,
      });
    }
  },
];

export const updateRol = [
  middleware(getRolSchema, "params"),
  middleware(updateRolSchema, "body"),
  async (req, resp) => {
    const { id } = req.params;
    const { rol, nombre } = req.body;
    try {
      const RolUpdate = await rolSchema.updateOne(
        { _id: id },
        { $set: { rol, nombre } }
      );
      if (RolUpdate.matchedCount === 0) {
        return resp.status(404).json({ message: "Rol no encontrado" });
      }
      if (RolUpdate.modifiedCount === 0) {
        return resp
          .status(400)
          .json({ message: "No se realizaron cambios al al Rol del usuario" });
      }
      resp.status(200).json({ message: "Rol actualizado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];

////
export const deleteRol = [
  middleware(deleteRolSchema, "params"),

  async (req, resp) => {
    const { id } = req.params;
    try {
      const result = rolSchema.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        resp.status(404).json({ message: "Rol no encontrado" });
      }
      resp.status(200).json({ message: "Rol eliminado correctamente" });
    } catch (error) {
      resp.status(500).json({ message: error.message });
    }
  },
];
