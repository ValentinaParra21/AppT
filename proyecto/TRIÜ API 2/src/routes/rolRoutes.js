import express from "express";
import { CreateRol, getRol, getRolById, updateRol, deleteRol } from '../controllers/rolController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Roles
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       properties:
 *         rol:
 *           type: integer
 *           description: ID numérico del rol
 *           example: 1
 *         nombre:
 *           type: string
 *           description: Nombre del rol
 *           example: "Administrador"
 *       required:
 *         - rol
 *         - nombre
 */

// 1. Crear Rol
/**
 * @swagger
 * /Rol:
 *   post:
 *     summary: Crear un nuevo Rol
 *     description: Permite crear un nuevo Rol.
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Error en la informacion del Rol
 */
router.post("/", CreateRol);

// 2. Obtener todos los Roles
/**
 * @swagger
 * /Rol:
 *   get:
 *     summary: Obtener todos los Roles
 *     description: Devuelve todos los Roles realizados.
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Lista de Roles que hay en el sistema
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'
 */
router.get("/", getRol);

// 3. Obtener Rol por ID
/**
 * @swagger
 * /Rol/{id}:
 *   get:
 *     summary: Obtener un Rol por ID
 *     description: Devuelve los detalles de un Rol específico usando su ID.
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Rol que se desea obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       404:
 *         description: Rol no encontrado
 */
router.get("/:id", getRolById);

// 4. Actualizar Rol
/**
 * @swagger
 * /Rol/{id}:
 *   put:
 *     summary: Actualizar un Rol existente
 *     description: Permite actualizar los datos de un Rol existente.
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Rol que se desea actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       400:
 *         description: Error en los datos del Rol
 *       404:
 *         description: Rol no encontrado
 */
router.put("/:id", updateRol);

// 5. Eliminar Rol
/**
 * @swagger
 * /Rol/{id}:
 *   delete:
 *     summary: Eliminar un Rol en el sistema
 *     description: Permite eliminar un Rol por su ID.
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del Rol a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 */
router.delete("/:id", deleteRol);

export default router;
